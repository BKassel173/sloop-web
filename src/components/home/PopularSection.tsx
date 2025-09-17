import Link from "next/link";
import ProductGrid from "@/components/site/product-grid";
import type { ProductCard } from "@/lib/shopify";

type Props = {
  title?: string;
  products: ProductCard[];
  viewAllHref: string;
};

export default function PopularSection({ title = "Popular", products, viewAllHref }: Props) {
  if (!products?.length) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Link className="underline underline-offset-4" href={viewAllHref}>
          View all
        </Link>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
