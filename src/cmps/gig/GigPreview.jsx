import { Link } from 'react-router-dom'
import { utilService } from '../../services/util.service'
import { reviewService } from '../../services/review.service'

import Slider from 'react-slick'
import StarIcon from '@mui/icons-material/Star'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { UserLevel } from '../UserLevel'
import { UserImg } from '../UserImg'

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
            <div>
                <Link className='clean-link' to={`/gig/${gig._id}`} target="_blank">
                    <div className='slider-container'>
                        <Slider {...settings}>
                            {gig.imgs.map((img, idx) => (
                                <img src={img} alt='img' key={idx} />

                            ))}
                        </Slider>
                        {/* <div className='heart'>
                            <FavoriteBorderIcon />
                        </div> */}
                    </div>
                </Link>
                <div className='gig-owner-details flex space-between align-center'>
                    <div className='owner-details flex align-center space-between'>
                        <UserImg imgUrl={gig.owner.imgUrl} size={24} />
                        <span>Ad by <span className='bold'>{gig.owner.fullname}</span></span>
                    </div>
                    <div className='flex row align-center level-container'>
                        <p className='level bold'>Level {gig.owner.rate}</p>
                        <UserLevel level={gig.owner.rate} />
                    </div>
                </div>

                <Link className='clean-link gig-title' to={`/gig/${gig._id}`} target="_blank">
                    {/* <a className='gig-title clean-link'> */}
                    <h3>{gig.title}</h3>
                    {/* </a> */}
                </Link>
            </div>
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