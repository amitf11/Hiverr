import { GigPreview } from './GigPreview'

export function GigList({ gigs }) {

    if (!gigs) return <div>Loading...</div>
    return (
        <section className='content flex'>
            <section className="gigs-container">
                {gigs.map((gig) => (
                    <GigPreview
                        className="gig"
                        key={gig._id}
                        gig={gig} />
                ))}
            </section>
        </section>
    )
}