import { useState } from 'react'
import { reviewService } from '../../services/review.service'
import ReactStars from 'react-stars'

export function ReviewAddModal({ addReview }) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [reviewToEdit, setReviewToEdit] = useState(reviewService.getEmptyReview())

    function onAdd(ev) {
        ev.preventDefault()
        addReview(reviewToEdit)
        setReviewToEdit(reviewService.getEmptyReview())
        setIsModalOpen(false)
    }

    function handelChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'number') value = +value

        setReviewToEdit(prevReviewToEdit => ({ ...prevReviewToEdit, [field]: value }))
    }

    function handelStarChange(value) {
        let field = 'rate'
        setReviewToEdit(prevReviewToEdit => ({ ...prevReviewToEdit, [field]: value }))
    }


    return (
        <section className="review-add">
            {!isModalOpen && <button onClick={() => setIsModalOpen(true)}>Add Review</button>}
            {isModalOpen && <div className='add-form'>
                <div className='flex header'>
                    <h1>Write your public review</h1>
                    <button className='close-btn' onClick={() => setIsModalOpen(false)}><svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M8.48514 7.00022L12.9723 2.51308L13.8976 1.58774C14.0341 1.45123 14.0341 1.22941 13.8976 1.09291L12.9075 0.102816C12.771 -0.0336885 12.5492 -0.0336885 12.4127 0.102816L7.00022 5.5153L1.58774 0.102378C1.45123 -0.0341261 1.22941 -0.0341261 1.09291 0.102378L0.102378 1.09247C-0.0341261 1.22898 -0.0341261 1.4508 0.102378 1.5873L5.5153 7.00022L0.102378 12.4127C-0.0341261 12.5492 -0.0341261 12.771 0.102378 12.9075L1.09247 13.8976C1.22898 14.0341 1.4508 14.0341 1.5873 13.8976L7.00022 8.48514L11.4874 12.9723L12.4127 13.8976C12.5492 14.0341 12.771 14.0341 12.9075 13.8976L13.8976 12.9075C14.0341 12.771 14.0341 12.5492 13.8976 12.4127L8.48514 7.00022Z"></path></svg></button>
                </div>

                <p>Share as many details as you can about what you liked or
                    disliked about the freelancer and the final result.
                </p>
                <form onSubmit={onAdd}>
                    <ReactStars
                        count={5}
                        value={reviewToEdit.rate}
                        onChange={handelStarChange}
                        size={24}
                        color1='#b5b6ba'
                        color2='#222325' />
                    <textarea onChange={handelChange} type='text'
                        id='review'
                        name='review'
                        htmlFor='review'
                        value={reviewToEdit.review}
                        placeholder='Write your review here...'>
                    </textarea>
                    <button>Submit</button>
                </form>
            </div>}
        </section>
    )
}