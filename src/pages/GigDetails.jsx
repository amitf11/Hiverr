import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { gigService } from '../services/gig.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { ReviewList } from '../cmps/reviews/ReviewList'
import Slider from "react-slick";

export function GigDetails() {

    const [gig, setGig] = useState(null)
    const { gigId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadGig()
    }, [gigId])

    async function loadGig() {
        try {
            const gig = await gigService.getById(gigId)
            setGig(gig)
        } catch (err) {
            showErrorMsg('Cant load gig')
            //   navigate('/gig')
        }
    }

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className="arrow next-arrow"
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className="arrow prev-arrow"
                onClick={onClick}
            />
        );
    }


    
    const settings = {
        customPaging: function (i) {
            return (
                <a>
                    <img src={gig.imgs[i + 1]} alt="" />
                </a>
            );
        },
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        dots: true,
        dotsClass: "clean-list flex carousle-imgs",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };



    if (!gig) return <div>Loading...</div>
    return (
        <section className='main-details'>
            <section className="gig-details">
                <div className="gig-layout">
                    <h1>{gig.title}</h1>
                    <div className="about-user">
                        <div className="user-pic">
                            <img src={gig.owner.imgUrl}></img>
                        </div>
                        <div className='user-info'>
                            <div className="info-first">
                                <h2>{gig.owner.fullname} </h2>
                                <div className='level'>
                                    <p className='number'>Level 2</p>
                                    <p className='diamonds'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10" fill="currentColor"><path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z"></path></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10" fill="currentColor"><path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z"></path></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10" fill="currentColor"><path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z"></path></svg>
                                    </p>
                                </div>
                            </div >

                            <div className='info-second'>
                                <h3>
                                    <span className='star'><svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"></path></svg>
                                    </span>
                                    <span className='rate'>{gig.owner.rate}.0</span> <Link className="count">({gig.reviews.length})</Link>
                                </h3>
                                <p>7 Orders in Queue</p></div>
                        </div>

                    </div>
                    <div className="folio">
                        <Slider {...settings}>
                            <img src="https://res.cloudinary.com/dippyaafg/image/upload/v1712227355/j6r691lenv3jk6cxtbnq.webp"></img>
                            <img src="https://res.cloudinary.com/dippyaafg/image/upload/v1712227355/j6r691lenv3jk6cxtbnq.webp"></img>
                            <img src="https://res.cloudinary.com/dippyaafg/image/upload/v1712227355/j6r691lenv3jk6cxtbnq.webp"></img>
                            <img src="https://res.cloudinary.com/dippyaafg/image/upload/v1712227355/j6r691lenv3jk6cxtbnq.webp"></img>
                            <img src="https://res.cloudinary.com/dippyaafg/image/upload/v1712227355/j6r691lenv3jk6cxtbnq.webp"></img>
                        </Slider>
                    </div>

                </div>
                <div className="about-this-gig">
                    <h2>About This Gig</h2>
                    {/* <pre>{gig.description}</pre> */}
                </div>
                {/* <div className="about-the-seller">
                    <h2>About the Seller</h2>
                </div> */}
                <ReviewList reviews={gig.reviews} />
            </section>
            <aside className="sidebar flex column">
                <div className="packages-tabs">
                    <div className="tab">
                        <button className="tablinks" >Basic</button>
                        <button className="tablinks" >Standard</button>
                        <button className="tablinks" >Premium</button>
                    </div>
                    <div className='package-main'>
                        <div className='package-content'>
                            <h3>
                                <div className="price">
                                    ₪{gig.price}.0
                                    <span>
                                        <svg width="16" height="16" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg" fill="#404145"><g clipPath="url(#info-outline-icon_svg__a)"><path d="M6.3 4h1.4v1.4H6.3V4Zm0 2.8h1.4V11H6.3V6.8ZM7 .5c-3.864 0-7 3.136-7 7s3.136 7 7 7 7-3.136 7-7-3.136-7-7-7Zm0 12.6a5.607 5.607 0 0 1-5.6-5.6c0-3.087 2.513-5.6 5.6-5.6 3.087 0 5.6 2.513 5.6 5.6 0 3.087-2.513 5.6-5.6 5.6Z"></path></g><defs><clipPath id="info-outline-icon_svg__a"><path transform="translate(0 .5)" d="M0 0h14v14H0z"></path></clipPath></defs></svg>
                                    </span>
                                </div>
                            </h3>


                            <p className="package">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. At iusto tempora officia totam accusantium!
                            </p>

                            <div className="second-row">
                                <div className="delivery">
                                    <div><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path><path d="M9 4H7v5h5V7H9V4z"></path></svg></div>
                                    <span>days delivery</span>
                                </div>
                                <div className='revisions'>
                                    <div><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#62646a"><path d="M4.50001 11.4999C6.40001 13.3999 9.60001 13.3999 11.5 11.4999C12.2 10.7999 12.7 9.7999 12.9 8.7999L14.9 9.0999C14.7 10.5999 14 11.8999 13 12.8999C10.3 15.5999 5.90001 15.5999 3.10001 12.8999L0.900012 15.0999L0.200012 8.6999L6.60001 9.3999L4.50001 11.4999Z"></path><path d="M15.8 7.2999L9.40001 6.5999L11.5 4.4999C9.60001 2.5999 6.40001 2.5999 4.50001 4.4999C3.80001 5.1999 3.30001 6.1999 3.10001 7.1999L1.10001 6.8999C1.30001 5.3999 2.00001 4.0999 3.00001 3.0999C4.40001 1.6999 6.10001 1.0999 7.90001 1.0999C9.70001 1.0999 11.5 1.7999 12.8 3.0999L15 0.899902L15.8 7.2999Z"></path></svg></div>
                                    <p>Unlimited Revisions</p>
                                </div>
                            </div>


                            <ul>
                                <li className='clean-list'><div><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path></svg></div><span>lorem ipsum</span></li>
                                <li className='clean-list' ><div><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path></svg></div><span>lorem ipsum</span></li>
                                <li className='clean-list'><div><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path></svg></div><span>lorem ipsum</span></li>
                            </ul>


                        </div>
                        <div className="continue-container">
                            <Link className="clean-link" to={`/gig/payment/${gig._id}`}>
                                <button className='continue'>Continue 
                                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M9.92332 2.96885C9.63854 2.66807 9.1768 2.66807 8.89202 2.96885C8.60723 3.26963 8.60723 3.75729 8.89202 4.05807L11.6958 7.01931H1.48616C1.08341 7.01931 0.756918 7.36413 0.756918 7.7895C0.756918 8.21487 1.08341 8.5597 1.48616 8.5597H11.8436L8.89202 11.677C8.60723 11.9778 8.60723 12.4654 8.89202 12.7662C9.1768 13.067 9.63854 13.067 9.92332 12.7662L14.0459 8.41213C14.3307 8.11135 14.3307 7.62369 14.0459 7.32291L13.977 7.25011C13.9737 7.24661 13.9704 7.24315 13.9671 7.23972L9.92332 2.96885Z"></path></svg>
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
                <div className="contact-container">
                    <button className='contact-plans-btn'>
                        Contact Me
                        <span>
                            <svg width="10" height="10" viewBox="0 0 14 9" xmlns="http://www.w3.org/2000/svg" fill="grey_1100"><path d="M.19 1.272.81.653a.375.375 0 0 1 .53 0L7 6.3 12.66.653a.375.375 0 0 1 .53 0l.62.62a.375.375 0 0 1 0 .53L7.264 8.346a.375.375 0 0 1-.53 0L.19 1.802a.375.375 0 0 1 0-.53Z"></path></svg>
                        </span>
                    </button>
                </div>
            </aside>
        </section >
    )
}