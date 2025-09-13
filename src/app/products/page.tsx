import { prisma } from '@/lib/prisma'

export default async function ProductsPage() {
  const products = await prisma.product.findMany()

  return (
    <div style={{ padding: 24 }}>
      <h1>Products</h1>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  )
}
