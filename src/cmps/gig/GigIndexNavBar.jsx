import { Link } from 'react-router-dom'
import { gigService } from '../../services/gig.service'

export function GigIndexNavBar({category}) {
    const desc = gigService.getCategoryDesc(category)

    return (
        <section className='index-nav-bar flex column'>
            <nav>
                <Link className='clean-link home-link' to={'/'}>
                    <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/search_perseus/home-breadcrumb.2ba1681.svg" alt="Fiverr" />
                </Link>
                <span className='divider'> / </span>
                <Link className='clean-link category-link' to={'/'}>
                    {category ? category : 'search'}
                </Link>
            </nav>

            <div className='index-category-titles'>
                <h2 className='index-category-title'>{category ? category : 'explore'}</h2>
                <p>{desc ? desc : 'Use Hiverr to find any service your heart desires.'}</p>
            </div>

        </section>
    )
}