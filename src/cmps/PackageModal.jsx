import { useState } from "react"
import { Link } from "react-router-dom"

export function PackageModal({ gig }) {

    const [plan,setPlan] = useState('basic')

    return (
        <aside className='sidebar flex column'>
            <div className='flex column packages-tabs'>
                <div className='flex row tab'>
                    <button onClick={()=> setPlan('basic')} 
                    className={`tablinks ${plan === 'basic' ? 'selected' : ''}`}>Basic</button>
                    <button onClick={()=> setPlan('standard')}
                     className={`tablinks ${plan === 'standard' ? 'selected' : ''}`}>Standard</button>
                    <button onClick={()=> setPlan('premium')}
                     className={`tablinks ${plan === 'premium' ? 'selected' : ''}`}>Premium</button>
                </div>
                <div className='package-main'>
                { plan === 'basic' && <div className='flex column package-content'>
                        <h3 className='flex row'>
                            <div className='price'>
                                ₪{gig.price}.0
                                <span>
                                    <svg width='16' height='16' viewBox='0 0 14 15' xmlns='http://www.w3.org/2000/svg' fill='#404145'><g clipPath='url(#info-outline-icon_svg__a)'><path d='M6.3 4h1.4v1.4H6.3V4Zm0 2.8h1.4V11H6.3V6.8ZM7 .5c-3.864 0-7 3.136-7 7s3.136 7 7 7 7-3.136 7-7-3.136-7-7-7Zm0 12.6a5.607 5.607 0 0 1-5.6-5.6c0-3.087 2.513-5.6 5.6-5.6 3.087 0 5.6 2.513 5.6 5.6 0 3.087-2.513 5.6-5.6 5.6Z'></path></g><defs><clipPath id='info-outline-icon_svg__a'><path transform='translate(0 .5)' d='M0 0h14v14H0z'></path></clipPath></defs></svg>
                                </span>
                            </div>
                        </h3>

                        <p className='package'>
                            {gig.title}
                        </p>

                        <div className='flex second-row'>
                            <div className='flex align-center delivery'>
                                <div className='flex align-center'><svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'><path d='M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z'></path><path d='M9 4H7v5h5V7H9V4z'></path></svg></div>
                                <span>days delivery</span>
                            </div>
                            <div className='flex revisions'>
                                <div><svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' fill='#62646a'><path d='M4.50001 11.4999C6.40001 13.3999 9.60001 13.3999 11.5 11.4999C12.2 10.7999 12.7 9.7999 12.9 8.7999L14.9 9.0999C14.7 10.5999 14 11.8999 13 12.8999C10.3 15.5999 5.90001 15.5999 3.10001 12.8999L0.900012 15.0999L0.200012 8.6999L6.60001 9.3999L4.50001 11.4999Z'></path><path d='M15.8 7.2999L9.40001 6.5999L11.5 4.4999C9.60001 2.5999 6.40001 2.5999 4.50001 4.4999C3.80001 5.1999 3.30001 6.1999 3.10001 7.1999L1.10001 6.8999C1.30001 5.3999 2.00001 4.0999 3.00001 3.0999C4.40001 1.6999 6.10001 1.0999 7.90001 1.0999C9.70001 1.0999 11.5 1.7999 12.8 3.0999L15 0.899902L15.8 7.2999Z'></path></svg></div>
                                <p>Unlimited Revisions</p>
                            </div>
                        </div>
                        <ul>
                            <li className='clean-list flex align-center'><div><svg width='16' height='16' viewBox='0 0 11 9' xmlns='http://www.w3.org/2000/svg' fill='currentFill'><path d='M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z'></path></svg></div><span>lorem ipsum</span></li>
                            <li className='clean-list flex align-center' ><div><svg width='16' height='16' viewBox='0 0 11 9' xmlns='http://www.w3.org/2000/svg' fill='currentFill'><path d='M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z'></path></svg></div><span>lorem ipsum</span></li>
                            <li className='clean-list flex align-center'><div><svg width='16' height='16' viewBox='0 0 11 9' xmlns='http://www.w3.org/2000/svg' fill='currentFill'><path d='M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z'></path></svg></div><span>lorem ipsum</span></li>
                        </ul>
                    </div>}
                    <div className='continue-container'>
                        <Link className='clean-link' to={`/gig/payment/${gig._id}`} target="_blank">
                            <button className='flex align-center continue'>Continue
                                <svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'><path d='M9.92332 2.96885C9.63854 2.66807 9.1768 2.66807 8.89202 2.96885C8.60723 3.26963 8.60723 3.75729 8.89202 4.05807L11.6958 7.01931H1.48616C1.08341 7.01931 0.756918 7.36413 0.756918 7.7895C0.756918 8.21487 1.08341 8.5597 1.48616 8.5597H11.8436L8.89202 11.677C8.60723 11.9778 8.60723 12.4654 8.89202 12.7662C9.1768 13.067 9.63854 13.067 9.92332 12.7662L14.0459 8.41213C14.3307 8.11135 14.3307 7.62369 14.0459 7.32291L13.977 7.25011C13.9737 7.24661 13.9704 7.24315 13.9671 7.23972L9.92332 2.96885Z'></path></svg>
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
            <div className='contact-container'>
                <button className='contact-plans-btn'>
                    Contact me
                    <span>
                        <svg width='10' height='10' viewBox='0 0 14 9' xmlns='http://www.w3.org/2000/svg' fill='grey_1100'><path d='M.19 1.272.81.653a.375.375 0 0 1 .53 0L7 6.3 12.66.653a.375.375 0 0 1 .53 0l.62.62a.375.375 0 0 1 0 .53L7.264 8.346a.375.375 0 0 1-.53 0L.19 1.802a.375.375 0 0 1 0-.53Z'></path></svg>
                    </span>
                </button>
            </div>
        </aside>
    )
}

