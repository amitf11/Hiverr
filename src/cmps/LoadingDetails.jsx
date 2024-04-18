import { Skeleton } from "@mui/material"

export function LoadingDetails() {

    return (
        <section className='flex main-details'>
            <section className='flex column gig-details'>
                <div className='gig-layout'>
                    <Skeleton variant="rectangular" />
                    <div className='flex row about-user'>
                        <div className='user-pic'>
                            <Skeleton variant="circular" width={64} height={64} />
                        </div>
                        <div className='user-info'>
                            <Skeleton variant="rectangular" />
                        </div>
                    </div>
                    <div className='folio'>
                        <Skeleton variant="rectangular" />
                    </div>
                </div>
            </section>
            <aside className='sidebar'>
                <div className='flex column packages-tabs'>
                    <Skeleton variant="rectangular" />
                </div>
            </aside>
        </section>
    )
}