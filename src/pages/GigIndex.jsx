import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from "react-router-dom"

import { loadGigs, setCategory, setFilterBy, setSearch } from '../store/actions/gig.actions.js'

import { GigList } from '../cmps/gig/GigList'
import { GigFilter } from '../cmps/gig/GigFilter'
import { GigIndexNavBar } from '../cmps/gig/GigIndexNavBar'

export function GigIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector(storeState => storeState.gigModule.filterBy)


    useEffect(() => {
        window.scrollTo(0, 0)
        const search = searchParams.get('search')
        const category = searchParams.get('category')
        const minPrice = searchParams.get('minPrice')

        filterBy.search = search
        filterBy.category = category
        filterBy.minPrice = +minPrice


        loadGigs(filterBy)
    }, [searchParams, filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    return (
        <section className='explore-page'>
            <GigIndexNavBar category={filterBy.category || 'Explore'} />

            <GigFilter
                filterBy={filterBy}
                onSetFilter={onSetFilter}
                setSearchParams={setSearchParams} />

            <div className='services-container'>
                <span className='available-services'>{gigs.length} services available</span>
            </div>

            <section className='gig-index flex column justify-center'>
                <GigList
                    gigs={gigs} />
            </section>
        </section>
    )
}