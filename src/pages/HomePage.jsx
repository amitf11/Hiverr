import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Hero } from '../cmps/Hero'



export function HomePage() {
    return (
        <>
            <section>
                <Hero />
            </section >
        </>
    )
}