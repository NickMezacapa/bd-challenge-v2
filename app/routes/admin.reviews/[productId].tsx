import { useLoaderData } from '@remix-run/react'
import db from '~/app/db.server'

type Review = {
  id: string
  rating: number
  message: string
  createdAt: string
  customer: {
    name: string
  }
  [key: string]: any
}

type LoaderParams = {
  productId: string
}

export const loader = async ({ params }: { params: LoaderParams }) => {
    const reviews = await db.review.findMany({
        where: { productId: params.productId },
        include: { customer: true },
        orderBy: { createdAt: 'desc' }
    })
    return new Response(JSON.stringify(reviews), { status: 200, headers: { 'Content-Type': 'application/json' } })
}

export default function ProductReviews() {
    const reviews = useLoaderData<Review[]>()
  
    return (
      <div>
        <h1>Product Reviews</h1>
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p><strong>{review.customer.name}</strong>: {review.rating}/5</p>
              <p>{review.message}</p>
              <p>{new Date(review.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

