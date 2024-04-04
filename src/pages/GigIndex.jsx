import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { GigList } from '../cmps/gig/GigList'
import { GigFilter } from '../cmps/gig/GigFilter'
import { GigIndexNavBar } from '../cmps/gig/GigIndexNavBar'
import { loadGigs } from '../store/actions/gig.actions.js'

export function GigIndex() {
    const gigs = useSelector(storeState => storeState.gigModule.gigs)

    useEffect(() => {
        loadGigs()
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <section className='gig-index-main'>
            <GigIndexNavBar />
            <GigFilter />
            <GigList
                gigs={gigs} />
        </section>
    )
}