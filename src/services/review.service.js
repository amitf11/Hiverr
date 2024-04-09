import { utilService } from './util.service'

export const reviewService = {
    getEmptyReview,
    getAvgRating
}

function getAvgRating(reviews) {
    let summedRating = reviews.reduce((acc, review) => review.rate + acc, 0)
    const avgRating = summedRating / reviews.length
    return avgRating.toFixed(1)
}

function getEmptyReview() {
    return {
        name: 'guest1',
        country: 'United States',
        flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
        review: '',
        reviewedAt: 'Published Today',
        rate: 1,
        _id: utilService.makeId()
    }
}