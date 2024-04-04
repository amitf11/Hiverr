import { Link } from 'react-router-dom'

export function GigIndexNavBar() {
    return (
        <>
            <Link className='clean-link' to={'/'}>
                Home
            </Link>
            /
            <Link className='clean-link' to={'/'}>
                Graphics & Design
            </Link>
        </>
    )
}