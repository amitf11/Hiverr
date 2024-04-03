import { GigPreview } from './GigPreview'

export function GigList({ gigs }) {
    return (
        <section className="gigs-container">
            {gigs.map((gig, idx) => (
                <GigPreview key={idx} gig={gig} />
            ))}
        </section>
    )
}