import Link from "next/link";
import Image from "next/image";
import type { StorefrontProduct as Product } from "@/lib/shopify";

function truncate(str: string, max: number) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "...";
}

function stripHtml(html?: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatPrice(amount?: string, currency?: string) {
  if (!amount || !currency) return "";
  try {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(Number(amount));
  } catch {
    return `${amount} ${currency}`;
  }
}

export default function ProductCard({ product }: { product: Product }) {
  const img = product.featuredImage;
  const price = product.priceRange?.minVariantPrice;

  // Prefer plain description; fall back to HTML (stripped)
  const rawDesc = product.description || product.descriptionHtml || "";
  const desc = stripHtml(rawDesc);

  return (
    <div
      data-testid="card-v2"  // <— TEST HOOK (look for this in DevTools Elements)
      className="relative rounded-2xl border border-zinc-200 p-3 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="pointer-events-none absolute right-3 top-3 z-10 h-7 w-7 rounded-full bg-white/80 backdrop-blur-sm grid place-items-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-zinc-400">
          <path d="M20.8 4.6a5.3 5.3 0 0 0-7.5 0l-.8.8-.8-.8a5.3 5.3 0 0 0-7.5 7.5l.8.8 7.5 7.5 7.5-7.5.8-.8a5.3 5.3 0 0 0 0-7.5Z" strokeWidth="1.5" />
        </svg>
      </div>

      <Link href={`/products/${product.handle}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-zinc-50">
          {img ? (
            <Image
              src={img.url}
              alt={img.altText ?? product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-sm text-zinc-400">
              No image
            </div>
          )}
        </div>

        {/* Text */}
        <div className="mt-3 space-y-1">
          {/* Title: single line, 28 chars */}
          <h3 className="text-lg font-semibold leading-snug">
            {truncate(product.title ?? "", 28)}
          </h3>

          {/* Description: up to two lines */}
          {desc && (
            <p
              className="text-sm text-zinc-500"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {desc}
            </p>
          )}

          {/* Price CTA */}
          {price && (
            <p className="mt-2 text-base leading-tight">
              <span className="text-zinc-700">from </span>
              <span className="text-xl font-extrabold text-black">
                {formatPrice(price.amount, price.currencyCode)}
              </span>
              <span className="text-zinc-700">/month</span>
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
