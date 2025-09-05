import { sanityClient } from '@/lib/sanity.client'
import { qProductBySlug } from '@/lib/sanity.queries'

export default async function ProductPage({ params }) {
  const product = await sanityClient.fetch(qProductBySlug, { slug: params.slug })
  if (!product) return <p className="p-6">Product not found</p>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="md:flex gap-6">
        <img src={product.imageUrl} alt={product.title} className="w-full md:w-1/2 h-96 object-cover rounded" />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2">${product.price}</p>
          <p className="mt-4">{product.description}</p>
        </div>
      </div>
    </div>
  )
}
