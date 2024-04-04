import { Link } from "react-router-dom"


export function GigPreview({ gig }) {
    return (
        <article className="gig-preview">
            <Link to={`/gig/${gig._id}`}>
                <img src='https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg' alt="" />
                <div className="gig-owner-details flex space-between align-center">
                    <div>
                        <span><img src={gig.owner.imgUrl} className="owner-profile" />Ad by</span>
                        <span className="bold">{gig.owner.fullname}</span>
                    </div>
                    <p className="bold">Level 2</p>
                </div>
                <h3>{gig.title}</h3>
            </Link>
            <div className="gig-rating">
                4.9 (118)
            </div>
            <p>From $39</p>

        </article>
    )
}