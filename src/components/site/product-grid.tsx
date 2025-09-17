import type { ProductCard } from "@/lib/shopify";

type ProductGridProps = {
  products?: ProductCard[];                 // new helpers (Popular/New)
  edges?: { node: ProductCard }[];          // legacy PRODUCTS_QUERY
};

export default function ProductGrid({ products, edges }: ProductGridProps) {
  const items: ProductCard[] = products ?? edges?.map(e => e.node) ?? [];
  if (!items.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((p) => (
        <div key={p.id} className="border rounded-lg p-4">
          {p.featuredImage && (
            <img
              src={p.featuredImage.url}
              alt={p.featuredImage.altText ?? p.title}
              width={p.featuredImage.width ?? 400}
              height={p.featuredImage.height ?? 400}
              className="mb-2 w-full h-auto object-cover"
            />
          )}
          <h3 className="text-sm font-medium">{p.title}</h3>
          {p.priceRange && (
            <p className="text-gray-600 text-sm">
              {p.priceRange.minVariantPrice.amount} {p.priceRange.minVariantPrice.currencyCode}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
