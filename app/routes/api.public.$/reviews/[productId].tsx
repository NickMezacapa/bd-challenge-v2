import db from '~/app/db.server'

export async function get({ params }: { params: { productId: string } }) {
    const reviews = await db.review.findMany({
      where: {
        productId: params.productId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  
    return new Response(JSON.stringify(reviews), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
