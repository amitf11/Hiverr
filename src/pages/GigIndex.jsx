import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadGigs } from '../store/actions/gig.actions.js'

import { GigList } from '../cmps/gig/GigList'
import { GigFilter } from '../cmps/gig/GigFilter'
import { GigIndexNavBar } from '../cmps/gig/GigIndexNavBar'

export function GigIndex() {
    const gigs = useSelector(storeState => storeState.gigModule.gigs)

    useEffect(() => {
        loadGigs()
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <section className='main-layout '>
            <GigIndexNavBar />
            <GigFilter />
            <span>{gigs.length} services available</span>
            <GigList
                gigs={gigs} />
        </section>
    )
}