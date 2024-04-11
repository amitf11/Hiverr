import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from "react-router-dom"

import { loadGigs, setCategory, setFilterBy, setSearch, setSortBy } from '../store/actions/gig.actions.js'

import { GigList } from '../cmps/gig/GigList'
import { GigFilter } from '../cmps/gig/GigFilter'
import { GigIndexNavBar } from '../cmps/gig/GigIndexNavBar'

export function GigIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector(storeState => storeState.gigModule.filterBy)
    const sortBy = useSelector(storeState => storeState.gigModule.sortBy)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        const txt = searchParams.get('txt')
        const category = searchParams.get('category')
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')
        const deliveryTime = searchParams.get('deliveryTime')

        filterBy.txt = txt
        filterBy.category = category
        filterBy.minPrice = +minPrice
        filterBy.maxPrice = +maxPrice
        filterBy.deliveryTime = +deliveryTime


        loadGigs(filterBy, sortBy)
    }, [searchParams, filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort(sortBy) {
        setSortBy(sortBy)
    }

    return (
        <section className='explore-page'>
            <GigIndexNavBar category={filterBy.category || 'Explore'} />

            <GigFilter
                filterBy={filterBy}
                sortBy={sortBy}
                onSetFilter={onSetFilter}
                onSetSort={onSetSort}
            // setSearchParams={setSearchParams}
            />

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