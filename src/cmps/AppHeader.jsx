import { NavLink, Link } from "react-router-dom"

export function AppHeader() {
    return <header className="app-header flex space-between">
        <Link className="clean-link logo" to="/"><h3 >Hiverr<span>.</span></h3></Link>
        <nav className="nav flex">
            <ul className="header-list clean-list flex">
                <li><NavLink to="/gig" className="clean-link">Explore</NavLink></li>
                {/* <li><NavLink to="">Become a seller</NavLink></li> add later */}
                <li>
                    <button>Sign in</button>
                </li>
                <li>
                    <button>Join</button>
                </li>
            </ul>
        </nav>
    </header>
}