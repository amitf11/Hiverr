import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GigIndex } from './GigIndex'


export function HomePage() {

    return (
        <section>

            <article>Changing Images
                <p>Find the right freelance service, right away</p>
                <input type="text" />
                <p>Popular:</p>
            </article>
            <article>
                Gigs:
                <GigIndex />
            </article>
            <div>Trusted By: </div>

            <article>
                Popular services <br />
                Carousle
            </article>
        </section >
    )
}