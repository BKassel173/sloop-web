export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { variants: true },
  })

  if (!product) return <div className="p-6">Not found</div>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold">{product.name}</h1>
      <p className="opacity-70 mt-2">{product.shortDesc}</p>
      <div className="mt-4">
        <strong>From ${product.pricePerWeek}/week</strong>
      </div>

      <div className="mt-6 space-y-2">
        {product.variants.map((v) => (
          <div key={v.id} className="text-sm">
            • {v.color ?? 'Standard'} — {v.capacity ?? 'Base'}
          </div>
        ))}
      </div>

      <button className="mt-6 px-4 py-2 rounded bg-black text-white">
        Start subscription
      </button>
    </div>
  )
}
