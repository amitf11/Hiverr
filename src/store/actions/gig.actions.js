import { gigService } from "../../services/gig.service.js"
import { store } from "../store.js"
import { SET_GIGS, SET_SEARCH } from "../reducers/gig.reducer.js"

export function loadGigs() {
    const { filterBy } = getState().gigModule
    return gigService.query(filterBy)
        .then(gigs => {
            store.dispatch({ type: SET_GIGS, gigs })
        })
        .catch(err => {
            console.log('cannot load gigs, heres why:', err)
            throw err
        })
}

export function setSearch(search) {
    return (dispatch) => {
        dispatch({ type: SET_SEARCH, search })
    }
}