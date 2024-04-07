import { Link } from "react-router-dom";

export function HomePageSlider() {
    const cards = [
        {   
            title: 'Website Development',
            backgroundColor: '#00732e',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156477/website-development.png'
        },
        {   
            title: 'Logo Design',
            backgroundColor: '#ff7640',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156494/logo-design.png'
        },
        {   
            title: 'SEO',
            backgroundColor: '#003912',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156488/seo.png'
        },
        {   
            title: 'Architecture & Interior Design',
            backgroundColor: '#4d1727',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156473/architecture-design.png' 
        },
        {   
            title: 'Social Media Marketing',
            backgroundColor: '#687200',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156476/social-media-marketing.png'
        },
    ]
    return (
        <div className="flex center">
            <section className="homepage-slider-container flex column">

                <h2 className="homepage-slider-title">Popular services</h2>
                <section className="homepage-slider-cards-container flex">
                    {
                        cards.map(card => {
                            return <article className="slider-card-container" style={{backgroundColor: card.backgroundColor }}>
                            <div className="slider-card">
                                <Link to="" className="flex column space-between">
                                    <h3>{card.title}</h3>
                                    <img src={card.imgUrl} alt="" />
                                </Link>
                            </div>
                        </article>
                        })
                    }

                    {/* <article className="slider-card-container">
                        <div className="slider-card">
                            <Link to="">
                                <h3>Voice Over</h3>
                                <img src="" alt="" />
                            </Link>
                        </div>
                    </article>

                    <article className="slider-card-container">
                        <div className="slider-card">
                            <Link to="">
                                <h3>Software Development</h3>
                                <img src="" alt="" />
                            </Link>
                        </div>
                    </article>

                    <article className="slider-card-container">
                        <div className="slider-card">
                            <Link to="">
                                <h3>Data Science & ML</h3>
                                <img src="" alt="" />
                            </Link>
                        </div>
                    </article> */}
                </section>
            </section>
        </div>
    )
}