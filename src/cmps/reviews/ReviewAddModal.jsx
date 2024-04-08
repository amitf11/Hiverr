import { useState } from 'react'
import { ReviewService } from '../../services/review.service'


export function ReviewAddModal({ addReview }) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [reviewToEdit, setReviewToEdit] = useState(ReviewService.getEmptyReview())

    function onAdd(ev) {
        ev.preventDefault()
        addReview(reviewToEdit)
    }

    function handelChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'number') value = +value

        setReviewToEdit(prevReviewToEdit => ({ ...prevReviewToEdit, [field]: value }))
    }


    return (
        <section>
            <button onClick={() => setIsModalOpen(true)}>Add Review</button>
            {isModalOpen && <div>
                <form onSubmit={onAdd}>
                    <label>
                        <input onChange={handelChange}
                            type='number'
                            id='rate'
                            name='rate'
                            for='rate'
                            min='1'
                            max='5'
                            value={reviewToEdit.rate}>
                        </input>
                    </label>
                    <label>
                        <input onChange={handelChange} type='text'
                            id='review'
                            name='review'
                            for='review'
                            placeholder={reviewToEdit.review}>
                        </input>
                    </label>
                    <button>Submit</button>
                </form>

                <button onClick={() => setIsModalOpen(false)}>X</button>
            </div>}
        </section>
    )
}