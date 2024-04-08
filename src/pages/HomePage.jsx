import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Hero } from '../cmps/Hero'
import { TrustedBy } from '../cmps/TrustedBy'
import { HeroFilter } from '../cmps/HeroFilter'
import { LoginSignup } from '../cmps/LoginSignup'
import { CategoriesNav } from '../cmps/CategoriesNav'
import { HomePageSlider } from '../cmps/HomePageSlider'
import { JoinPoster } from '../cmps/JoinPoster'
// import { PopularServices } from '../cmps/PopularServices'



export function HomePage() {
    return (
        <>
            <section>
                <Hero />
                <TrustedBy />
                <LoginSignup />

                {/* <PopularServices /> */}
                <HomePageSlider />
                <CategoriesNav />
                <JoinPoster />
            </section >
        </>
    )
}