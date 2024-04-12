import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Hero } from '../cmps/Hero'
import { TrustedBy } from '../cmps/TrustedBy'
import { HeroFilter } from '../cmps/HeroFilter'
import { JoinPoster } from '../cmps/JoinPoster'
import { TheBestPart } from '../cmps/TheBestPart'
import { LoginSignup } from '../cmps/LoginSignup'
import { CategoriesNav } from '../cmps/CategoriesNav'
import { HomePageSlider } from '../cmps/HomePageSlider'
// import { PopularServices } from '../cmps/PopularServices'



export function HomePage() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            {/* <section> */}
                <Hero />
                <TrustedBy />
                <LoginSignup />
                {/* <HomePageSlider /> */}
                <TheBestPart />
                <CategoriesNav />
                <JoinPoster />
            {/* </section > */}
        </>
    )
}