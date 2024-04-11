import { store } from '../store.js'
import { gigService } from '../../services/gig.service.js'
import { ADD_GIG, SET_CATEGORY, SET_FILTER, SET_GIGS, SET_SEARCH, SET_SORT, SET_USER_GIGS } from '../reducers/gig.reducer.js'

export async function loadGigs(filterBy, sortBy) {
    try {
        const gigs = await gigService.query(filterBy, sortBy)
        store.dispatch({ type: SET_GIGS, gigs })
    } catch (err) {
        console.log('cannot load gigs, here\'s why:', err)
        throw err
    }
}

export async function loadUserGigs(userId) {
    try {
        const userGigs = await gigService.getByUserId(userId)
        store.dispatch({ type: SET_USER_GIGS, userGigs })
        console.log('userGigs:', userGigs)
    } catch (err) {
        console.log('cannot load gigs, here\'s why:', err)
        throw err
    }
}

export async function addGig(gig) {
    try {
        await gigService.save(gig)
        store.dispatch({ type: ADD_GIG, gig })
    } catch (err) {
        console.log('cannot load gigs, here\'s why:', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
}

export function setSortBy(sortBy) {
    store.dispatch({ type: SET_SORT, sortBy })
}

export function setCategory(category) {
    store.dispatch({ type: SET_CATEGORY, category })
}

export function setSearch(search) {
    store.dispatch({ type: SET_SEARCH, search })
}