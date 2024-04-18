import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from "react-router-dom"

import { loadGigs, setFilterBy } from '../store/actions/gig.actions.js'

import { GigList } from '../cmps/gig/GigList'
import { GigFilter } from '../cmps/gig/GigFilter'
import { GigIndexNavBar } from '../cmps/gig/GigIndexNavBar'

export function GigIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector(storeState => storeState.gigModule.filterBy)
    const [sortBy, setSortBy] = useState('recommended')
    useEffect(() => {
        window.scrollTo(0, 0)
        const txt = searchParams.get('txt')
        const category = searchParams.get('category')
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice') || Infinity
        const deliveryTime = searchParams.get('deliveryTime') || Infinity
        const sellerLevel = searchParams.get('sellerLevel')

        filterBy.txt = txt
        filterBy.category = category
        filterBy.minPrice = +minPrice === 0 ? '' : +minPrice
        filterBy.maxPrice = +maxPrice
        filterBy.deliveryTime = +deliveryTime
        filterBy.sellerLevel = +sellerLevel

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
            <GigIndexNavBar category={filterBy.category || 'Explore'}/>

                <GigFilter
                    filterBy={filterBy}
                    sortBy={sortBy}
                    onSetFilter={onSetFilter}
                    onSetSort={onSetSort}
                    gigs={gigs}
                />

            <section className='gig-index flex column justify-center'>
                <GigList
                    gigs={gigs} />
            </section>
        </section>
    )
}