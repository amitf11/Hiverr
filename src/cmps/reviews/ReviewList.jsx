
import { ReviewPreview } from './ReviewPreview'
import { ReviewStats } from './ReviewStats'
// import { ReviewFilter } from './ReviewFilter'
import { ReviewAddModal } from './ReviewAddModal'


export function ReviewList({ reviews, addReview }) {

    if (!reviews) return <div>No review to show...</div>
    return (
        <section className='review-list'>
            <ReviewStats reviews={reviews} />
            <ReviewAddModal addReview={addReview} />
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