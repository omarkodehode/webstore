import { auth } from '@clerk/nextjs/server'
import { sanityClient } from '@/lib/sanity.client'
import { qProductById } from '@/lib/sanity.queries'
import EditUI from '../EditUI'

export default async function EditPage({ params }) {
  const { userId } = auth()
  if (!userId) return <div className="p-6">You must be logged in</div>

  const product = await sanityClient.fetch(qProductById, { id: params.id })
  if (!product) return <div className="p-6">Product not found</div>

  return <EditUI product={product} />
}
