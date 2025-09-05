import { auth } from '@clerk/nextjs/server'
import { sanityClient } from '@/lib/sanity.client'
import { qProducts } from '@/lib/sanity.queries'
import AdminUI from './adminUI'
export default async function AdminPage() {
  const { userId } = auth()
  if (!userId) {
    return (
      <div className="p-6">
        <p>You must be logged in to access the admin panel.</p>
        <a href="/sign-in" className="text-blue-600 underline">Sign in</a>
      </div>
    )
  }

  const products = await sanityClient.fetch(qProducts)
  return <AdminUI initialProducts={products} />
}
