import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from "react-router-dom"

import { loadGigs, setCategory, setSearch, setFilterBy } from '../store/actions/gig.actions.js'

import { GigList } from '../cmps/gig/GigList'
import { GigFilter } from '../cmps/gig/GigFilter'
import { GigIndexNavBar } from '../cmps/gig/GigIndexNavBar'

export function GigIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector(storeState => storeState.gigModule.filterBy)

    
    useEffect (() => {
        loadGigs()
        
    }, [filterBy])
    
    
    useEffect(() => {
        const search = searchParams.get('search')
        const category = searchParams.get('category')
        setSearch(search)
        setCategory(category)
        console.log('category:', category)
    }, [searchParams])
    
    
    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    return (
        <section className='explore-page'>
            <GigIndexNavBar category={filterBy.category || 'Explore'} />
            
            <GigFilter
                filterBy={filterBy}
                onSetFilter={onSetFilter} />

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