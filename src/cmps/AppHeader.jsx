import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return <header>
        Nav Bar
        <NavLink to={'/gig'}>
            Explore
        </NavLink>
    </header>
}