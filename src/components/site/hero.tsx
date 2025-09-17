'use client'

import Link from 'next/link'

type Product = {
  id: string
  slug: string
  name: string
  shortDesc: string | null
  pricePerWeek: number
  imageUrl: string | null
} | null

export default function Hero({ product }: { product: Product }) {
  const title =
    product?.name ?? 'Premium tech, simple rental'
  const desc =
    product?.shortDesc ?? 'Access the latest devices without the upfront cost. Upgrade anytime.'
  const ctaHref =
    product?.slug ? `/products/${product.slug}` : '/products'
  const price =
    product?.pricePerWeek ? `From $${product.pricePerWeek}/week` : ''

  return (
    <section className="relative bg-gradient-to-b from-sloop-purple/90 to-sloop-purple text-white">
      <div className="mx-auto max-w-6xl px-6 py-24 flex flex-col md:flex-row items-center gap-10">
        {/* Left: text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {title}
          </h1>
          <p className="mt-4 text-lg opacity-90">{desc}</p>
          {price && <p className="mt-2 text-base opacity-90">{price}</p>}
          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <Link
              href={ctaHref}
              className="bg-white text-sloop-purple px-6 py-3 rounded-md font-semibold hover:opacity-90"
            >
              {product ? 'View product' : 'Browse products'}
            </Link>
            <Link
              href="/#how-it-works"
              className="border border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-sloop-purple"
            >
              How it works
            </Link>
          </div>
        </div>

        {/* Right: image */}
        <div className="flex-1">
          <div className="w-full h-64 md:h-96 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
            {product?.imageUrl ? (
              // simple img for now; can switch to next/image later
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white/70">[Device image here]</span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
