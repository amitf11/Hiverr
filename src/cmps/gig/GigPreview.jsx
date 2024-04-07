import { Link } from "react-router-dom"
import { utilService } from "../../services/util.service"

import Slider from "react-slick";
import StarIcon from "@mui/icons-material/Star"

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
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
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
                    <p className="level bold">Level 2</p>
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