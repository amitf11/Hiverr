import { gigService } from "../../services/gig.service.js"
import { store } from "../store.js"
import { SET_GIGS } from "../reducers/gig.reducer.js"

export function loadGigs(filterBy, sort) {
    return gigService.query()
        .then(gigs => {
            store.dispatch({ type: SET_GIGS, gigs })
        })
        .catch(err => {
            console.log('cannot load gigs, heres why:', err)
            throw err
        })
}