import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Hero } from '../cmps/Hero'
import { HeroFilter } from '../cmps/HeroFilter'



export function HomePage() {
    return (
        <>
            <section>
                <Hero />
                {/* <HeroFilter /> */}
                <div className='trusted-by flex align-center'>
                    <div className='trusted-by-txt'>
                        Trusted by:
                    </div>
                    <ul className='flex clean-list'>
                        <li><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png" alt="facebook" /></li>
                        <li><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png" alt="Google" /></li>
                        <li><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png" alt="NETFLIX" /></li>
                        <li><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png" alt="PG" /></li>
                        <li><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png" alt="PayPal" /></li>
                    </ul>
                </div>
            </section >
        </>
    )
}