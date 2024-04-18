

import { Link } from "react-router-dom";

export function HomePageSlider() {
    //WORKING:
    // const cards = [
    //     {
    //         title: 'Website Development',
    //         backgroundColor: '#00732e',
    //         imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156477/website-development.png'
    //     },
    //     {
    //         title: 'Logo Design',
    //         backgroundColor: '#ff7640',
    //         imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156494/logo-design.png'
    //     },
    //     {
    //         title: 'SEO',
    //         backgroundColor: '#003912',
    //         imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156488/seo.png'
    //     },
    //     {
    //         title: 'Architecture & Interior Design',
    //         backgroundColor: '#4d1727',
    //         imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156473/architecture-design.png'
    //     },
    //     {
    //         title: 'Social Media Marketing',
    //         backgroundColor: '#687200',
    //         imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156476/social-media-marketing.png'
    //     },
    // ]


    //***************  TEST:   *************
    const cards = [
        {
            small: 'Add talent to AI',
            title: 'AI Artist',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161247/ai-artists-2x.png',
            filterUrl: '/gig?category=ai-services'

        },
        {
            small: 'Build your brand',
            title: 'Logo Design',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/logo-design-2x.png',
            filterUrl: '/gig?category=logo-design'
        },
        {
            small: 'Customize your site',
            title: 'WordPress',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/wordpress-2x.png',
            filterUrl: '/gig?category=word-press',
        },
        {
            small: 'Share your message',
            title: 'Voice Over',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161253/voice-over-2x.png',
            filterUrl: '/gig?category=music',
        },
        {
            small: 'Engage your audience',
            title: 'Video Explainer',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161245/animated-explainer-2x.png',
            filterUrl: '/gig?category=video-animation',
        },
    ]

    return (
        <div className="flex center">
            <section className="homepage-slider-container flex column">

                <h2 className="homepage-slider-title">Popular services</h2>
                <section className="homepage-slider-cards-container flex">
                    {
                        cards.map(card => (
                            <article className="new-card">
                                <img src={card.imgUrl} alt="" />
                                <div className="new-card-titles">
                                    <h6 className="new-card-small-title">{card.small}</h6>
                                    <h4 className="new-card-big-title">{card.title}</h4>
                                </div>
                            </article>
                        ))
                    }




                    {/* WORKING: */}
                    {/* {
                        cards.map(card => {
                            return <article className="slider-card-container" style={{ backgroundColor: card.backgroundColor }}>
                                <div className="slider-card">
                                    <Link to="" className="flex column space-between">
                                        <h3>{card.title}</h3>
                                        <img src={card.imgUrl} alt="" />
                                    </Link>
                                </div>
                            </article>
                        })
                    } */}

                </section>
            </section>
        </div>
    )
}