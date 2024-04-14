import { gigService } from "../../services/gig.service"

export const ADD_GIG = 'ADD_GIG'
export const SET_GIGS = 'SET_GIGS'
export const REMOVE_GIG = 'REMOVE_GIG'
export const SET_SEARCH = 'SET_SEARCH'
export const SET_FILTER = 'SET_FILTER'
export const SET_USER_GIGS = 'SET_USER_GIGS'


const initialState = {
    gigs: [],
    userGigs: [],
    filterBy: gigService.getDefaultFilter(),
}
export function gigReducer(state = initialState, action) {
    let gigs
    let filterBy

    switch (action.type) {
        case ADD_GIG:
            return { ...state, gigs: [...state.gigs, action.gig] }

        case REMOVE_GIG:
            gigs = state.gigs.filter(gig => gig._id !== action.gigId)
            return { ...state, gigs }

        case SET_GIGS:
            return { ...state, gigs: action.gigs }

        case SET_USER_GIGS:
            return { ...state, userGigs: action.userGigs }

        case SET_FILTER:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        default:
            return state
    }
} 