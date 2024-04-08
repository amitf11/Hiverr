import { Link } from "react-router-dom"
import { utilService } from "../../services/util.service"

import Slider from "react-slick";
import StarIcon from "@mui/icons-material/Star"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export function GigPreview({ gig }) {

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className="arrow next-arrow"
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className="arrow prev-arrow"
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
        <article className="gig-preview flex column justify-center">
            
            <Link className="clean-link" to={`/gig/${gig._id}`}>
                <Slider {...settings}>
                    <img src='https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg' alt="" />
                    <img src='https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg' alt="" />
                    <img src='https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg' alt="" />
                    <img src='https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg' alt="" />
                </Slider>
                <div className="gig-owner-details flex space-between align-center">
                    <div className="owner-details flex align-center space-between">
                        <img src={gig.owner.imgUrl} className="owner-profile" />
                        <span>Ad by <span className="bold">{gig.owner.fullname}</span></span>
                    </div>
                    <div className="level-container">
                        <p className="level bold">Level 2</p>
                        <div className="diamonds">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10" fill="currentColor"><path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10" fill="currentColor"><path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10" fill="currentColor"><path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z"></path></svg>
                        </div>
                    </div>
                </div>
                <a className="gig-title clean-link">
                    <h3>{gig.title}</h3>
                </a>
            </Link>
            <div className="gig-rating flex align-center">
                <div className="inner-rating-container flex align-center">
                    <StarIcon className="star" />
                    <strong>{gig.reviews.length ? utilService.getAvgRating(gig.reviews) : 0}</strong>
                    <span className="rating-count">({gig.reviews.length})</span>
                </div>
            </div>
            <strong className="price">From ${gig.price}</strong>

        </article>
    )
}