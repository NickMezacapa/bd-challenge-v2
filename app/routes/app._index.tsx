import { useEffect, useState } from 'react'
import { useParams } from '@remix-run/react';

import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
} from '@shopify/polaris';

interface Review {
  id: string
  rating: number
  message: string
  [key: string]: any
}

export default function Index() {
  const [reviews, setReviews] = useState<Review[]>([])
  const { productId } = useParams<{ productId: string }>()

  // Fetch reviews when component mounts
  useEffect(() => {
    if (!productId) {
      console.error("No product ID found.")
      return
    }

    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/public/reviews/${productId}`)
        const data = await response.json()

        setReviews(data.reviews || []) 
      } catch (error) {
        console.error('Error fetching reviews: ', error)
      }
    }

    fetchReviews()
  }, [productId])

  return (
    <Page title="Reviewer 9000">
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <Text as="h2" variant="headingMd">Product Reviews</Text>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <Card key={review.id}>
                      <BlockStack gap="200">
                        <Text as="h3" variant="headingSm">Rating: {review.rating}/5</Text>
                        <Text as="p" variant="bodyMd">{review.message}</Text>
                      </BlockStack>
                    </Card>
                  ))
                ) : (
                  <Text as="p" variant="bodyMd">No reviews yet.</Text>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
