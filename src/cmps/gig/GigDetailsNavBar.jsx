import { Link } from 'react-router-dom'

export function GigDetailsNavBar({ category }) {

    function getModifiedCategoryTitle(category) {
        const modifiedCat = category.replace(/-/g, ' & ')
        return modifiedCat.charAt(0).toUpperCase() + modifiedCat.slice(1)
    }

    return (
        <section className='flex column details-nav-bar'>
            <nav>
                <Link className='clean-link home-link' to={'/'}>
                    <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/search_perseus/home-breadcrumb.2ba1681.svg" alt="Fiverr" />
                </Link>
                <span className='divider'> / </span>
                <Link className='clean-link category-link' to={(category === 'Explore') ? '/gig' : `/gig/?category=${category}`}  >
                    {getModifiedCategoryTitle(category)}
                </Link>
            </nav>
        </section>
    )
}