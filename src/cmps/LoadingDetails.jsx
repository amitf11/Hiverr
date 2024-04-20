import { Skeleton } from "@mui/material"

export function LoadingDetails() {

    return (
        <section className='flex main-details skeleton-details'>
            <section className='flex column gig-details'>
                <div className='gig-layout'>
                    <Skeleton className='skeleton-title' variant="rectangular"height={50} />
                    <div className='flex row about-user'>
                        <div className='user-pic'>
                            <Skeleton variant="circular" width={64} height={64} />
                        </div>
                        <div className='flex align-center user-info width100'>
                            <Skeleton className='width100' variant="rectangular" height={30} />
                        </div>
                    </div>
                    <div className='folio'>
                        <Skeleton variant="rectangular" height={500} />
                    </div>
                </div>
            </section>
            <aside className='sidebar'>
                <div className='flex column packages-tabs'>
                    <Skeleton variant="rectangular" height={400}/>
                </div>
            </aside>
        </section>
    )
}