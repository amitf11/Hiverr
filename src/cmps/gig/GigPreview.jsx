import { Link } from "react-router-dom"


export function GigPreview({ gig }) {
    return (
        <article>
            <img src='https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg' alt="" />
            <h3>{gig.owner.fullname}</h3>
            <h3>{gig.title}</h3>
            <h1>**********</h1>
            <Link to={`/gig/${gig._id}`}>Details</Link>
        </article>
    )
}