import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadGigs, saveGig, removeGig, setFilterBy, setSortBy } from '../store/actions/gig.actions.js'
import { GigList } from '../cmps/gig/GigList'

export function GigIndex() {
    const gigs = useSelector(storeState => storeState.gigModule.gigs)

    useEffect(() => {
        loadGigs()
            .catch(err => {
                console.log(err)
            })
    }, [])





    return (
        <section>
            <GigList
                gigs={gigs} />
        </section>
    )
}