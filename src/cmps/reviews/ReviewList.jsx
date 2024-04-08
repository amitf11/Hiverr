import { ReviewPreview } from './ReviewPreview'
import { ReviewStats } from './ReviewStats'

export function ReviewList({ reviews }) {

    if (!reviews) return <div>No review to show...</div>
    return (
        <section className='review-list'>
            <ReviewStats reviews={reviews} />
            <section className='review-container'>
                {reviews.map((review) => (
                    <ReviewPreview
                        key={review._id}
                        className='review'
                        review={review} />
                ))}
            </section>
        </section>
    )
}