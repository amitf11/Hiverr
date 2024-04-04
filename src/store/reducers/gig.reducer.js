import { gigService } from "../../services/gig.service"

export const SET_GIGS = 'SET_GIGS'
export const SET_SEARCH = 'SET_SEARCH'

const initialState = {
    gigs: [],
    filterBy: { search: "" },
}

export function gigReducer(state = initialState, action) {
    let gigs
    let filterBy

    switch (action.type) {
        case SET_GIGS:
            return { ...state, gigs: action.gigs }


        case SET_SEARCH:
            filterBy = { ...state.filterBy, search: action.search }
            return { ...state, filterBy }
        default:
            return state
    }
} 