'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function AdminUI({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts || [])
  const [form, setForm] = useState({ title: '', price: '', description: '', slug: '' })
  const [loading, setLoading] = useState(false)

  async function handleCreate(e) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        price: Number(form.price),
        description: form.description,
        slug: form.slug || undefined
      })
    })
    if (res.ok) {
      const all = await fetch('/api/products').then(r => r.json())
      setProducts(all)
      setForm({ title: '', price: '', description: '', slug: '' })
    } else {
      alert('Error creating product')
    }
    setLoading(false)
  }

  async function handleDelete(id) {
    if (!confirm('Delete product?')) return
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setProducts(products.filter((p) => p.id !== id))
    } else {
      alert('Error deleting')
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin panel</h1>

      <form onSubmit={handleCreate} className="mb-6 grid gap-2">
        <input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} placeholder="Title" className="p-2 border rounded"/>
        <input value={form.slug} onChange={e=>setForm({...form, slug: e.target.value})} placeholder="Slug (optional)" className="p-2 border rounded"/>
        <input value={form.price} onChange={e=>setForm({...form, price: e.target.value})} placeholder="Price" className="p-2 border rounded"/>
        <textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} placeholder="Description" className="p-2 border rounded"/>
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? 'Saving...' : 'Create product'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-3">Products</h2>
      <div className="grid gap-3">
        {products.map(p => (
          <div key={p.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-600">${p.price}</div>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/edit/${p.id}`} className="underline text-blue-600">Edit</Link>
              <button onClick={()=>handleDelete(p.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
