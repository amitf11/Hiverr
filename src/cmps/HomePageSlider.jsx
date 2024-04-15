import { Link } from "react-router-dom"
import Slider from 'react-slick'

export function HomePageSlider() {
    const cards = [
        {
            small: 'Add talent to AI',
            title: 'AI Artist',
            small: 'Add talent to AI',
            title: 'AI Artist',
            backgroundColor: '#00732e',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161247/ai-artists-2x.png',
            filterUrl: '/gig?category=ai-services'

            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161247/ai-artists-2x.png',
            filterUrl: '/gig?category=ai-services'

        },
        {
            small: 'Build your brand',
            small: 'Build your brand',
            title: 'Logo Design',
            backgroundColor: '#ff7640',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/logo-design-2x.png',
        },
        {
            small: 'Customize your site',
            title: 'WordPress',
            small: 'Customize your site',
            title: 'WordPress',
            backgroundColor: '#003912',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/wordpress-2x.png',
            filterUrl: '/gig?category=word-press'
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/wordpress-2x.png',
            filterUrl: '/gig?category=word-press'
        },
        {
            small: 'Share your message',
            title: 'Voice Over',
            small: 'Share your message',
            title: 'Voice Over',
            backgroundColor: '#4d1727',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161253/voice-over-2x.png',
            filterUrl: '/gig?category=music'
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161253/voice-over-2x.png',
            filterUrl: '/gig?category=music'
        },
        {
            small: 'Engage your audience',
            title: 'Video Explainer',
            small: 'Engage your audience',
            title: 'Video Explainer',
            backgroundColor: '#687200',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161245/animated-explainer-2x.png',
            filterUrl: '/gig?category=video-animation'
        },
        {
            small: 'Reach more customers',
            title: 'Social Media',
            backgroundColor: '#421300',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161249/social-2x.png',
            filterUrl: '/gig?category=social-media'
        },
        {
            small: 'Unlock growth online',
            title: 'SEO',
            backgroundColor: '#421300',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/27f914ed7984fdd2d55aa1fb5e74bd6a-1690384243592/seo-2x.png',
            filterUrl: '/gig?category=seo-services'
        },
        {
            small: 'Color your dreams',
            title: 'Illustration',
            backgroundColor: '#421300',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161236/illustration-2x.png',
            filterUrl: '/gig?category=graphics-design'
        },
        {
            small: 'Go global',
            title: 'Translation',
            backgroundColor: '#421300',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161247/translation-2x.png',
            filterUrl: '/gig?category=translation'
        },
        {
            small: 'Reach more customers',
            title: 'Social Media',
            backgroundColor: '#421300',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161249/social-2x.png',
            filterUrl: '/gig?category=social-media'
        },
        {
            small: 'Unlock growth online',
            title: 'SEO',
            backgroundColor: '#421300',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/27f914ed7984fdd2d55aa1fb5e74bd6a-1690384243592/seo-2x.png',
            filterUrl: '/gig?category=seo-services'
        },
        {
            small: 'Color your dreams',
            title: 'Illustration',
            backgroundColor: '#421300',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161236/illustration-2x.png',
            filterUrl: '/gig?category=graphics-design'
        },
        {
            small: 'Go global',
            title: 'Translation',
            backgroundColor: '#421300',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161247/translation-2x.png',
            filterUrl: '/gig?category=translation'
        },
        {
            small: 'Learn your business',
            title: 'Data Entry',
            backgroundColor: '#421300',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161248/data-entry-2x.png',
            filterUrl: '/gig?category=data'
        },
        {
            small: 'Showcase your story',
            title: 'Book Covers',
            backgroundColor: '#421300',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161248/data-entry-2x.png',
            filterUrl: '/gig?category=data'
        },
        {
            small: 'Showcase your story',
            title: 'Book Covers',
            backgroundColor: '#421300',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161238/book-covers-2x.png',
            filterUrl: '/gig?category=graphics-design'
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161238/book-covers-2x.png',
            filterUrl: '/gig?category=graphics-design'
        },
    ]

    function SampleNextArrow(props) {
        const { className, style, onClick } = props
        const { className, style, onClick } = props
        return (
            <div
                className='arrow next-arrow'
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props
        const { className, style, onClick } = props
        return (
            <div
                className='arrow prev-arrow'
                onClick={onClick}
            />
        );
    }

    const settings = {
        customPaging: function (i) {
            return (
                <a>
                    {cards[i] && (
                        <img src={cards[i].imgUrl} />
                    )}
                </a>
            )
        },
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        dots: true,
        dotsClass: 'clean-list carousle-imgs',
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,


    }

    return (
        <div className="flex center">

            <section className="homepage-slider-container flex column">

                <h2 className="homepage-slider-title">Popular services</h2>
                {/* <section className="homepage-slider-cards-container flex"> */}

                <Slider {...settings}>
                    {cards.map(card => {
                        return (
                            <article className="slider-card-container" key={card.title}>
                                {/* <div className="slider-card" key={card.title}> */}
                                <Link to={card.filterUrl} className="flex column space-between">
                                    <div >
                                        <h4>
                                            <small>{card.small}</small>
                                            {card.title}
                                        </h4>
                                        <img src={card.imgUrl} />
                                    </div>
                                </Link>
                                {/* </div> */}
                            </article>
                        )
                    })}
                </Slider>
            </section>
            {/* </section> */}
        </div>
    )
}