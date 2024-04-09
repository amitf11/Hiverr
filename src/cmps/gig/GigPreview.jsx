import { Link } from 'react-router-dom'
import { utilService } from '../../services/util.service'
import { reviewService } from '../../services/review.service'

import Slider from 'react-slick'
import StarIcon from '@mui/icons-material/Star'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { UserLevel } from '../UserLevel'

export function GigPreview({ gig }) {

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className='arrow next-arrow'
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className='arrow prev-arrow'
                onClick={onClick}
            />
        );
    }

    const settings = {
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }


    return (
        <article className='gig-preview flex column space-between'>

            <Link className='clean-link' to={`/gig/${gig._id}`}>
                <div className='slider-container'>
                    <Slider {...settings}>
                        {gig.imgs.map(img => (
                            <img src={img} alt='img' />
                        ))}
                        {/* <img src='https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg' alt='' />
                        <img src='https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg' alt='' />
                        <img src='https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg' alt='' /> */}
                    </Slider>
                    <div className='heart'>
                        <FavoriteBorderIcon />
                    </div>
                </div>
                <div className='gig-owner-details flex space-between align-center'>
                    <div className='owner-details flex align-center space-between'>
                        <img src={gig.owner.imgUrl} className='owner-profile' />
                        <span>Ad by <span className='bold'>{gig.owner.fullname}</span></span>
                    </div>
                    <div className='flex row align-center level-container'>
                        <p className='level bold'>Level {gig.owner.rate}</p>
                        <UserLevel level={gig.owner.rate} />
                    </div>
                </div>
                <a className='gig-title clean-link'>
                    <h3>{gig.title}</h3>
                </a>
            </Link>
            <div className='gig-rating flex column'>
                <div className='inner-rating-container flex align-center'>
                    <StarIcon className='flex star' />
                    <strong>{gig.reviews.length ? reviewService.getAvgRating(gig.reviews) : 0}</strong>
                    <span className='rating-count'>({gig.reviews.length})</span>
                </div>
                <strong className='price'>From ${gig.price}</strong>
            </div>

        </article>
    )
}