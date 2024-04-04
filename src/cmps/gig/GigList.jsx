import { GigPreview } from './GigPreview'

export function GigList({ gigs }) {
    return (
        <section className="gigs-container gig-index-layout">
            {gigs.map((gig, idx) => (
                <GigPreview 
                    className="gig" 
                    key={idx} 
                    gig={gig} />
            ))}
        </section>
    )
}