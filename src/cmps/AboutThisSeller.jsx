
import { UserLevel } from "./UserLevel"
import { reviewService } from "../services/review.service"

export function AboutThisSeller({ gig }) {
    return (
        <section className='flex column about-this-seller-container'>
            <span className='seller-title'>Get to know {gig.owner.fullname.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
            <div className='first-row-container'>
                <div className='flex row align-center seller-details'>
                    <div className='seller-img-container'>
                        <img src={gig.owner.imgUrl}></img>
                    </div>
                    <div className='flex column inner-container'>
                        <div>
                            <b>
                                {gig.owner.fullname.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </b>
                        </div>
                        <div>

                            <div className='flex row align-center first-row'>
                                <div className='flex align-center level-container'>
                                    <span className='flex align-center star'><svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"></path></svg></span>
                                    <span className='flex align-center rating-score'>{reviewService.getAvgRating(gig.reviews)} ({gig.reviews.length})</span>
                                </div>
                                <div className='flex align-center owner-rate'>
                                    Level {gig.owner.rate}
                                    <UserLevel level={gig.owner.rate} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='contact-btn-container'>
                    <button>Contact me</button>
                </div>
            </div>
            <div className='flex column owner-desc'>
                <div>
                    <ul className='clean-list grid'>
                        <li className="flex column">From <b>
                            {gig.country}
                        </b>
                        </li>
                        <li>Member since</li>
                        <li className="flex column">Avg. response time <b>2 hours</b></li>
                        <li className="flex column">Last delivery <b>about 1 hour
                        </b></li>
                        <li><p>Languages</p></li>
                    </ul>

                </div>
                <div className='about-seller'> {gig.about}</div>
            </div>
        </section>
    )
}