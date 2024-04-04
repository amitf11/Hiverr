import { Link } from "react-router-dom"
import { utilService } from "../../services/util.service"
import StarIcon from "@mui/icons-material/Star"

export function GigPreview({ gig }) {
    return (
        <article className="gig-preview flex column justify-center">
            <Link className="clean-link" to={`/gig/${gig._id}`}>
                <img src='https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg' alt="" />
                <div className="gig-owner-details flex space-between align-center">
                    <div>
                        <img src={gig.owner.imgUrl} className="owner-profile" />
                        <span>Ad by <span className="bold">{gig.owner.fullname}</span></span>
                    </div>
                    <p className="level bold">Level 2</p>
                </div>
                <h3 className="gig-title">{gig.title}</h3>
            </Link>
            <div className="gig-rating flex">
                <StarIcon fontSize="small"/>
                <strong>{gig.reviews.length ? utilService.getAvgRating(gig.reviews) : 0}</strong>
                <span>({gig.reviews.length})</span>
            </div>
            <strong className="price">From ${gig.price}</strong>

        </article>
    )
}