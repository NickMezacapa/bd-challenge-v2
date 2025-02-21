import { useLoaderData } from '@remix-run/react'
import db from '~/app/db.server'

type Product = {
    id: string
    name: string
}

export const loader = async () => {
    const products = await db.product.findMany({
        select: { id: true, name: true }
    })
    return new Response(JSON.stringify(products), { status: 200, headers: { 'Content-Type': 'application/json' } })
}

export default function ProductList() {
    const products = useLoaderData<Product[]>()

    console.log(products)
    return (
        <section>
            <h1>Product Reviews</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <a href={`/admin/reviews/${product.id}`}>
                            {product.name}
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    )
}
