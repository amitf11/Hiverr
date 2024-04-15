import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { gigService } from '../services/gig.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { ReviewList } from '../cmps/reviews/ReviewList'
import Slider from 'react-slick'
import { UserLevel } from '../cmps/UserLevel'
import { PackageModal } from '../cmps/PackageModal'
import { AboutThisSeller } from '../cmps/AboutThisSeller'

export function GigDetails() {

    const [screenWidth, setScreenWidth] = useState()
    const [gig, setGig] = useState(null)
    const { gigId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadGig()

        setScreenWidth(window.innerWidth)
        window.removeEventListener('resize', onResize)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)

    }, [gigId, gig])

    useEffect(() => {
        window.scrollTo(0, 0)

    }, [])

    const onResize = () => {
        setScreenWidth(window.innerWidth)
    }


    async function loadGig() {
        try {
            const gig = await gigService.getById(gigId)
            setGig(gig)
        } catch (err) {
            showErrorMsg('Cant load gig')
        }
    }

    function SampleNextArrow({ onClick }) {
        return (
            <div
                className='arrow next-arrow'
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow({ onClick }) {
        return (
            <div
                className='arrow prev-arrow'
                onClick={onClick}
            />
        );
    }

    async function addReview(newReview) {
        try {
            setGig(prevGig => {
                const updatedGig = {
                    ...prevGig,
                    reviews: [newReview, ...prevGig.reviews],
                }
                gigService.save(updatedGig)
                return updatedGig
            })
        } catch (err) {
            console.log('Problem with saving the review:', err)
        }
    }
    const settings = {
        customPaging: function (i) {
            return (
                <a>
                    <img src={gig.imgs[i]} alt='' />
                </a>
            );
        },
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        dots: true,
        dotsClass: 'clean-list flex carousle-imgs',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    if (!gig) return <div>Loading...</div>
    return (
        <section className='flex main-details'>
            <section className='flex column gig-details'>
                <div className='gig-layout'>
                    <h1>{gig.title}</h1>
                    <div className='flex row about-user'>
                        <div className='user-pic'>
                            <img src={gig.owner.imgUrl}></img>
                        </div>
                        <div className='user-info'>
                            <div className='flex space-between info-first'>
                                <h2>{gig.owner.fullname} </h2>
                                <div className='flex align-center level'>
                                    <div className='flex number'>Level {gig.owner.rate}</div>
                                    <UserLevel level={gig.owner.rate} />
                                </div>
                            </div >

                            <div className='flex info-second'>
                                <h3>
                                    <span className='star'><svg width='16' height='15' viewBox='0 0 16 15' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z'></path></svg>
                                    </span>
                                    <span className='rate'>{gig.owner.rate}.0</span> <Link className='count'>({gig.reviews.length})</Link>
                                </h3>
                                <p>7 Orders in Queue</p></div>
                        </div>

                    </div>
                    <div className='folio'>
                        <Slider {...settings}>
                            {gig.imgs.map((img, idx) => (
                                <img src={img}
                                    key={idx} />
                            ))}
                        </Slider>
                    </div>
                </div>
                {(screenWidth < 920) && <PackageModal gig={gig} />}
                <div className='about-this-gig'>
                    <h2>About This Gig</h2>
                    <div>
                        <pre>{gig.description}</pre>
                    </div>
                </div>
                <AboutThisSeller gig={gig}/>
                <ReviewList reviews={gig.reviews} addReview={addReview} />
            </section>
                    {/* <PackageModal gig={gig} /> */}
            {(screenWidth > 920) && <PackageModal gig={gig} />}
        </section >
    )
}