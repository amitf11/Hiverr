
import { ReviewPreview } from "../ReviewPreview"

export function ReviewList({ reviews }) {

    return (
        <section className="review-list">
            <ul className="review-container">
                {reviews.map((review) => (
                    <ReviewPreview
                        className="review"
                        key={review._id}
                        review={review} />
                ))}
            </ul>
        </section>
    )
}