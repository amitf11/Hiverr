<<<<<<< HEAD
import { NavLink, Link } from "react-router-dom"

export function AppHeader() {
    return <header className="app-header flex space-between">
        <Link className="clean-link logo" to="/"><h3 >Hiverr<span>.</span></h3></Link>
        <nav className="nav flex">
            <ul className="header-list clean-list flex">
                <li><NavLink to="/gig" className="clean-link">Explore</NavLink></li>
                {/* <li><NavLink to="">Become a seller</NavLink></li> add later */}
                <li>
                    <a href="" className="clean-link">Sign in</a>
                </li>
                <li>
                    <button>Join</button>
                </li>
            </ul>
        </nav>
=======
import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return <header>
        Nav Bar
        <NavLink to={'/gig'}>
            Gigs
        </NavLink>
>>>>>>> d974c703bf1dfce28d455cffaf6f09738bd46d3b
    </header>
}