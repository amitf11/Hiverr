import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { gigService } from '../services/gig.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { ReviewList } from '../cmps/ReviewList'

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



    if (!gig) return <div>Loading...</div>
    return (
        <section className='main-details'>
            <section className="gig-details">
                <article>
                    <h1>{gig.title}</h1>
                    <div className="about-user">
                        <h2>{gig.owner.fullname}</h2>
                        <h3>{gig.owner.rate}</h3>
                    </div>
                    <div className="img-gig">
                        <img src={gig.img} />
                    </div>

                </article>

                <div className='reviews'>
                    <h1>What people loved about this seller</h1>
                    <a herf="reviews">See all reviews</a>
                </div>
                <div className="top-reviews"></div>
                <div>
                    {gig.about}
                </div>
                <ReviewList />
            </section>
            <aside className="sidebar">
                <div className="packages-tabs">
                    <h1>basic</h1>
                    <h2>{gig.price}</h2>
                    <button>continue</button>
                </div>
            </aside>
        </section>
    )
}