import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from "react-router-dom"

import { loadGigs, setCategory, setSearch } from '../store/actions/gig.actions.js'

import { GigList } from '../cmps/gig/GigList'
import { GigFilter } from '../cmps/gig/GigFilter'
import { GigIndexNavBar } from '../cmps/gig/GigIndexNavBar'

export function GigIndex() {
    const filterBy = useSelector(storeState => storeState.gigModule.filterBy)
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const category = searchParams.get('category')
        const search = searchParams.get('search')
        setCategory(category || '')
        setSearch(search || '')
        loadGigs()
            .catch(err => {
                console.log(err)
            })
    }, [searchParams])

    console.log(filterBy);
    return (
        <section className='explore-page'>
            <h1>
                Explore
            </h1>
            <GigIndexNavBar />
            <GigFilter />
            <span>{gigs.length} services available</span>
            <section className='gig-index flex column justify-center'>
                <GigList
                    gigs={gigs} />
            </section>
        </section>
    )
}