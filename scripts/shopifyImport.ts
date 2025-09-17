import * as dotenv from "dotenv";
dotenv.config({ path: `${process.cwd()}/.env` });
dotenv.config({ path: `${process.cwd()}/.env.local` }); // optional fallback
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function required(name: string, val?: string) {
  if (!val) throw new Error(`Missing env var: ${name}`);
  return val;
}

const STORE_DOMAIN = required("SHOPIFY_STORE_DOMAIN", process.env.SHOPIFY_STORE_DOMAIN);
const API_VERSION = process.env.SHOPIFY_API_VERSION || "2025-07";
const STOREFRONT_TOKEN = required(
  "SHOPIFY_STOREFRONT_API_TOKEN",
  process.env.SHOPIFY_STOREFRONT_API_TOKEN
);

// GraphQL query for products
const QUERY = `
  query Products($first:Int!, $after:String) {
    products(first:$first, after:$after, sortKey:TITLE) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          handle
          title
          vendor
          description
          images(first: 1) { edges { node { url altText } } }
          variants(first: 1) {
            edges { node { price { amount } } }
          }
        }
      }
    }
  }
`;

async function fetchPage(after?: string) {
  const res = await fetch(`https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query: QUERY, variables: { first: 100, after } }),
  });

  if (!res.ok) throw new Error(`Shopify ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.errors) throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`);
  return json.data.products as {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    edges: any[];
  };
}

function toWeekly(priceAmount?: string | number): number {
  const p = Number(priceAmount || 0);
  const weekly = p > 0 ? p / 4.3333 : 0; // naive monthly → weekly
  return Math.max(1, Math.round(weekly * 100) / 100);
}

async function upsertProduct(edge: any) {
  const n = edge.node;
  const handle: string = n.handle;
  const title: string = n.title;
  const vendor: string | null = n.vendor ?? null;
  const description: string = n.description ?? "";
  const imageUrl: string | null = n.images?.edges?.[0]?.node?.url ?? null;
  const priceAmount: string | number | undefined =
    n.variants?.edges?.[0]?.node?.price?.amount;

  const weekly = toWeekly(priceAmount);

  await prisma.product.upsert({
    where: { slug: handle },
    update: {
      name: title,
      brand: vendor || "",
      model: "",
      shortDesc: description.slice(0, 160),
      pricePerWeek: weekly,
      imageUrl: imageUrl ?? null,
    },
    create: {
      slug: handle,
      name: title,
      brand: vendor || "",
      model: "",
      shortDesc: description.slice(0, 160),
      pricePerWeek: weekly,
      imageUrl: imageUrl ?? null,
    },
  });
}

async function main() {
  console.log("🔄 Importing products from Shopify…");
  let after: string | undefined = undefined;
  let total = 0;

  while (true) {
    const page = await fetchPage(after);
    for (const edge of page.edges) {
      await upsertProduct(edge);
      total++;
    }
    if (!page.pageInfo.hasNextPage || !page.pageInfo.endCursor) break;
    after = page.pageInfo.endCursor;
  }

  console.log(`✅ Import complete. Upserted ${total} product(s).`);
}

main()
  .catch((e) => {
    console.error("❌ Import failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
