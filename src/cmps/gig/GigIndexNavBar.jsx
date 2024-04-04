import { Link } from 'react-router-dom'

export function GigIndexNavBar() {
    return (
        <>
            <Link to={'/'}>
                Home
            </Link>
            /
            <Link to={'/'}>
                Graphics & Design
            </Link>
        </>
    )
}