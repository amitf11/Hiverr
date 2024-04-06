import { Link } from 'react-router-dom'

export function GigIndexNavBar() {
    return (
        <section className='index-nav-bar flex column'>
            <nav>
                <Link className='clean-link home-link' to={'/'}>
                    <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/search_perseus/home-breadcrumb.2ba1681.svg" alt="Fiverr" />
                </Link>
                <span className='divider'> / </span>
                <Link className='clean-link category-link' to={'/'}>
                    Graphics & Design
                </Link>
            </nav>

            <div className='index-category-titles'>
                <h2 className='index-category-title'>Category Name</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, doloribus possimus.</p>
            </div>

        </section>
    )
}