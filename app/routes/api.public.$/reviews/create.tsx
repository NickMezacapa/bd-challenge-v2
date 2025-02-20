import db from '~/app/db.server'

export async function post(req: Request) {
    const { productId, rating, message, customerId } = await req.json()
  
    const review = await db.review.create({
      data: {
        productId,
        rating,
        message,
        customerId,
      },
    })
  
    return new Response(JSON.stringify(review), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
