import { GigPreview } from './GigPreview'
import { Skeleton } from '@mui/material'
import { Grid } from '@mui/material'


export function GigList({ gigs }) {

    if (!gigs || !gigs.length) return (
        <Grid container item xs={3} spacing={0} direction="column">
            <Skeleton variant="rectangular"></Skeleton>
            <Skeleton variant="rectangular"></Skeleton>
            <Skeleton variant="rectangular"></Skeleton>
        </Grid>
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