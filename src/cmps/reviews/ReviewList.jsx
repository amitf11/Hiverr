
import { ReviewPreview } from "../ReviewPreview"

export function ReviewList({ reviews }) {

    console.log(reviews)
    if (!reviews) return <div>No review to show...</div>
    return (

        <section className="review-list">
            <section className="review-container">
                {reviews.map((review) => (
                    <ReviewPreview
                        className="review"
                        review={review} />
                ))}
            </section>
        </section>
    )
}