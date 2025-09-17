// src/lib/shopify.ts
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

/**
 * ENV — make sure these exist in .env.local
 * SHOPIFY_STORE_DOMAIN=yourstore.myshopify.com
 * SHOPIFY_STOREFRONT_API_TOKEN=xxxxx
 * SHOPIFY_API_VERSION=2024-07
 */
const shopDomain = process.env.SHOPIFY_STORE_DOMAIN;            // "xxx.myshopify.com" (no protocol)
const apiVersion = process.env.SHOPIFY_API_VERSION || "2024-07";
const token = process.env.SHOPIFY_STOREFRONT_API_TOKEN;         // Storefront public token

export const shopifyEnabled = Boolean(shopDomain && token);

export const client = shopifyEnabled
  ? createStorefrontApiClient({
      storeDomain: shopDomain!,
      apiVersion,
      publicAccessToken: token!,
    })
  : null;

export async function shopifyFetch<T>(query: string, variables?: Record<string, any>) {
  if (!client) throw new Error("Shopify client not configured");
  const { data, errors } = await client.request<T>(query, { variables });
  if (errors && errors.length) {
    throw new Error(JSON.stringify(errors));
  }
  return data;
}

/** Shared product shape for grids/cards */
export type StorefrontProduct = {
  id: string;
  handle: string;
  title: string;
  vendor?: string;
  description?: string;        // plain text (may be empty depending on your Admin usage)
  descriptionHtml?: string;    // HTML (often populated even if description is empty)
  featuredImage?: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  };
  priceRange?: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
};

/** Your existing query — keep as-is (edges-based) */
export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int = 12) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          images(first: 1) {
            edges { node { url altText width height } }
          }
          variants(first: 1) {
            edges { node { price { amount currencyCode } } }
          }
        }
      }
    }
  }
`;

/** Reusable fragment for card fields (now includes description + descriptionHtml) */
const PRODUCT_CARD = /* GraphQL */ `
  fragment ProductCard on Product {
    id
    handle
    title
    vendor
    description
    descriptionHtml
    featuredImage { url altText width height }
    priceRange { minVariantPrice { amount currencyCode } }
  }
`;

/** Popular: products from a manual Shopify collection by handle (e.g., "homepage-popular") */
export async function getCollectionProducts(
  handle: string,
  limit = 4
): Promise<StorefrontProduct[]> {
  const q = /* GraphQL */ `
    ${PRODUCT_CARD}
    query CollectionGrid($handle: String!, $limit: Int!) {
      collectionByHandle(handle: $handle) {
        products(first: $limit) {
          nodes { ...ProductCard }
        }
      }
    }
  `;
  const data = await shopifyFetch<{
    collectionByHandle: { products: { nodes: StorefrontProduct[] } } | null;
  }>(q, { handle, limit });

  return data.collectionByHandle?.products?.nodes ?? [];
}

/** New: newest products by created date (automatic) */
export async function getNewestProducts(limit = 4): Promise<StorefrontProduct[]> {
  const q = /* GraphQL */ `
    ${PRODUCT_CARD}
    query Newest($limit: Int!) {
      products(first: $limit, sortKey: CREATED_AT, reverse: true) {
        nodes { ...ProductCard }
      }
    }
  `;
  const data = await shopifyFetch<{ products: { nodes: StorefrontProduct[] } }>(q, { limit });
  return data.products?.nodes ?? [];
}
