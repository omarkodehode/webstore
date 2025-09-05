'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditUI({ product }) {
  const [form, setForm] = useState({ title: product.title, price: product.price, description: product.description, slug: product.slug?.current || '' })
  const router = useRouter()

  async function handleSave(e) {
    e.preventDefault()
    const res = await fetch(`/api/products/${product.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: form.title, price: Number(form.price), description: form.description, slug: form.slug })
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      alert('Error saving')
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit product</h1>
      <form onSubmit={handleSave} className="grid gap-2">
        <input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} className="p-2 border rounded" />
        <input value={form.slug} onChange={e=>setForm({...form, slug: e.target.value})} className="p-2 border rounded" />
        <input value={form.price} onChange={e=>setForm({...form, price: e.target.value})} className="p-2 border rounded" />
        <textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} className="p-2 border rounded" />
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Save</button>
          <a className="underline" href="/admin">Cancel</a>
        </div>
      </form>
    </div>
  )
}
