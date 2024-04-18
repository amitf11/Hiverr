import { Skeleton } from "@mui/material"

export function LoadingList() {
    return (
        <ul className='clean-list grid gigs-container'>
            <li><SkeletonPreview /></li>
            <li><SkeletonPreview /></li>
            <li><SkeletonPreview /></li>
            <li><SkeletonPreview /></li>
        </ul>
    )
}
function SkeletonPreview() {
    return (
        <div className='flex column space-between gig-preview'>
            <Skeleton variant="rectangular" width={210} height={118} />
            <div className='flex align-center gig-owner-details'>
                <div className='owner-details flex align-center space-between'>
                    <Skeleton className='user-im' variant="circular" width={24} height={24} />
                    <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                </div>
            </div>
        </div>
    )
}

