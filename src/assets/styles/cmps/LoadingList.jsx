import { Skeleton } from "@mui/material"

export function LoadingList() {
    return (
        <ul className='clean-list grid gigs-container skeleton-container'>
            <li className='skeleton-list'><SkeletonPreview /></li>
            <li className='skeleton-list'><SkeletonPreview /></li>
            <li className='skeleton-list'><SkeletonPreview /></li>
            <li className='skeleton-list'><SkeletonPreview /></li>
        </ul>
    )
}
function SkeletonPreview() {
    return (
        <div className='flex column space-between gig-preview skeleton-preview'>
            <Skeleton className='skeleton-img' variant="rectangular" />
            <div className='flex align-center space-between gig-owner-details'>
                <div className='flex align-center space-between owner-details '>
                    <Skeleton className='user-image' variant="circular" width={24} height={24} />
                    <Skeleton className='skeleton-text' variant="rectangular" width={100} />
                </div>
                <div className='flex align-center level-container'>
                    <Skeleton className='level' variant="rectangular" width={60} />
                </div>
            </div>
            <Skeleton className='skeleton-text price second-line' variant="rectangular" />
        </div>
    )
}

