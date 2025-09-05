import { NextResponse } from 'next/server'
import { sanityClient, sanityWrite } from '@/lib/sanity.client'

export async function GET() {
  const products = await sanityClient.fetch(`*[_type=="product"]{..., "id": _id, "imageUrl": image.asset->url}`)
  return NextResponse.json(products)
}

export async function POST(req) {
  const body = await req.json()
  const doc = {
    _type: 'product',
    title: body.title,
    slug: { _type: 'slug', current: body.slug || slugify(body.title) },
    price: body.price,
    description: body.description,
  }
  const created = await sanityWrite.create(doc)
  return NextResponse.json({ id: created._id }, { status: 201 })
}

function slugify(s) {
  return s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')
}
