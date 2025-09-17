import ProductCard from "@/components/ProductCard"; // <— IMPORTANT: top-level components/ProductCard.tsx
import type { StorefrontProduct as Product } from "@/lib/shopify";

type ProductGridProps = {
  products?: Product[];               // for Popular/New helpers
  edges?: { node: Product }[];        // for legacy PRODUCTS_QUERY
};

export default function ProductGrid({ products, edges }: ProductGridProps) {
  const items: Product[] = products ?? edges?.map((e) => e.node) ?? [];
  if (!items.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
