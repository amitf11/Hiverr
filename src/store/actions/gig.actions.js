import { gigService } from '../../services/gig.service.js'
import { store } from '../store.js'
import { SET_CATEGORY, SET_FILTER, SET_GIGS, SET_SEARCH } from '../reducers/gig.reducer.js'

export async function loadGigs() {
    try {
        const { filterBy } = store.getState().gigModule
        const gigs = await gigService.query(filterBy)
        store.dispatch({ type: SET_GIGS, gigs })
    } catch (err) {
        console.log('cannot load gigs, here\'s why:', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
        store.dispatch({ type: SET_FILTER, filterBy })
}

export function setCategory(category) {
    store.dispatch({ type: SET_CATEGORY, category })
}

export function setSearch(search) {
    store.dispatch({ type: SET_SEARCH, search })
}