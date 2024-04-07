import { Link } from "react-router-dom";

export function SubHeader() {
    return <ul className="categories-menu flex space-between clean-list">
        <li><Link to="/gig?category=graphics-design">Graphics & Design</Link></li>
        <li><Link to="/gig?category=programming-tech">Programming & Tech</Link></li>
        <li><Link to="/gig?category=digital-marketing">Digital Marketing</Link></li>
        <li><Link to="/gig?category=video-animation">Video & Animation</Link></li>
        <li><Link to="/gig?category=writing-translation">Writing & Translation</Link></li>
        <li><Link to="/gig?category=music">Music & Audio</Link></li>
        <li><Link to="/gig?category=business">Business</Link></li>
        <li><Link to="/gig?category=consulting">Consulting</Link></li>
        <li><Link to="/gig?category=data">Data</Link></li>
        <li><Link to="/gig?category=ai-services">Ai Services</Link></li>
    </ul>
}