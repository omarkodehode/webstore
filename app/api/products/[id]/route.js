import { NextResponse } from 'next/server'
import { sanityClient, sanityWrite } from '@/lib/sanity.client'

export async function GET(req, { params }) {
  const product = await sanityClient.fetch(`*[_type=="product" && _id==$id][0]{..., "id": _id, "imageUrl": image.asset->url}`, { id: params.id })
  if (!product) return new NextResponse('Not found', { status: 404 })
  return NextResponse.json(product)
}

export async function PATCH(req, { params }) {
  const body = await req.json()
  const patch = sanityWrite.patch(params.id).set({
    title: body.title,
    price: body.price,
    description: body.description,
    slug: { _type: 'slug', current: body.slug || slugify(body.title) }
  })
  const updated = await patch.commit()
  return NextResponse.json(updated)
}

export async function DELETE(req, { params }) {
  await sanityWrite.delete(params.id)
  return NextResponse.json({ message: 'Deleted' })
}

function slugify(s) {
  return s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')
}
