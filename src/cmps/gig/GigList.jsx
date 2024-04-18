import { GigPreview } from './GigPreview'
import { LoadingList } from '../../assets/styles/cmps/LoadingList'


export function GigList({ gigs }) {

    console.log(gigs)

    if (!gigs || !gigs.length) return (
        <LoadingList/>
    )
    return (
        <section className='content flex'>
            <section className="grid gigs-container">
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