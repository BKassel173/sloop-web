import Link from "next/link"
import { Button } from "@/components/ui/button"

type Props = {
  id: string
  slug: string
  name: string
  shortDesc?: string | null
  pricePerWeek: number
  imageUrl?: string | null
}

export default function ProductCard(p: Props) {
  return (
    <div className="rounded-2xl bg-white shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition">
      {/* Image */}
      <div className="aspect-[4/3] bg-neutral-100">
        {/* swap to next/image later */}
        <img
          src={p.imageUrl || "/placeholder-iphone.png"}
          alt={p.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <Link href={`/products/${p.slug}`} className="block">
          <h3 className="text-lg font-semibold hover:underline">{p.name}</h3>
        </Link>
        <p className="mt-1 text-sm text-neutral-600 line-clamp-2">
          {p.shortDesc || "Premium device rental"}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold">From ${p.pricePerWeek}/week</span>
          <Button className="bg-sloop-purple hover:bg-sloop-purple/90">
            View
          </Button>
        </div>
      </div>
    </div>
  )
}
