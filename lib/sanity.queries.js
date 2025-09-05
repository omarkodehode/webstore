export const qProducts = `*[_type=="product"]{..., "id": _id, "imageUrl": image.asset->url}`
export const qProductBySlug = `*[_type=="product" && slug.current==$slug][0]{..., "id": _id, "imageUrl": image.asset->url}`
export const qProductById = `*[_type=="product" && _id==$id][0]{..., "id": _id, "imageUrl": image.asset->url}`
