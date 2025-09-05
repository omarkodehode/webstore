import { sanityClient } from '@/lib/sanity.client'
import { qProducts } from '@/lib/sanity.queries'
import Link from 'next/link'

export default async function HomePage() {
  const products = await sanityClient.fetch(qProducts)

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <nav className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline mr-5">Home</Link>
        <Link href="/" className="text-blue-600 hover:underline ml-7 ">   about us </Link>
      </nav>
      <h1 className="text-3xl font-bold mb-6">Webstore</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.slug.current}`} className="block p-4 border rounded-lg hover:shadow">
            <img src={p.imageUrl} alt={p.title} className="w-full h-48 object-cover rounded" />
            <h2 className="mt-3 text-lg font-semibold">{p.title}</h2>
            <p className="text-gray-600">${p.price}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
