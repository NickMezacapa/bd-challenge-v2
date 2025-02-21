import { useEffect, useState } from 'react'

const ReviewForm = ({ productId }: { productId: string }) => {
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoaded, setIsLoaded] = useState(false);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value))
  }

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  }

  const handleSubmit = async () => {
    if (!rating || !message) {
      setError('Rating and message are required.')
      return
    }

    const response = await fetch(`/api/public/reviews/create`, {
      method: 'POST',
      body: new URLSearchParams({
        productId,
        rating: String(rating),
        message,
      }),
    })

    if (response.ok) {
      alert('Review submitted successfully!')
    } else {
      setError('There was an error submitting your review.')
    }
  }

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Submit Your Review</h3>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <input
            key={star}
            type="radio"
            value={star}
            checked={rating === star}
            onChange={handleRatingChange}
          />
        ))}
      </div>
      <textarea
        placeholder="Write your review..."
        value={message}
        onChange={handleMessageChange}
      ></textarea>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  )
}

export default ReviewForm
