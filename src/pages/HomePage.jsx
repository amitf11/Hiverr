import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
<<<<<<< HEAD
import { HeroWrapper } from '../cmps/HeroWrapper'
import { GigIndex } from './GigIndex'
=======
>>>>>>> d974c703bf1dfce28d455cffaf6f09738bd46d3b


export function HomePage() {
    
    return (
        <section>

            <HeroWrapper />
            {/* <article>Changing Images
                <p>Find the right freelance service, right away</p>
                <input type="text" />
                <p>Popular:</p>
<<<<<<< HEAD
            </article> */}
            <article>
                Gigs:
                <GigIndex />
            </article>
=======
            </article>
            
>>>>>>> d974c703bf1dfce28d455cffaf6f09738bd46d3b
            <div>Trusted By: </div>

            <article>
                Popular services <br />
                Carousle
            </article>
        </section >
    )
}