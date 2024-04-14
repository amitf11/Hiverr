import { gigService } from "../../services/gig.service"

export const ADD_GIG = 'ADD_GIG'
export const SET_SORT = 'SET_SORT'
export const SET_GIGS = 'SET_GIGS'
export const REMOVE_GIG = 'REMOVE_GIG'
export const SET_SEARCH = 'SET_SEARCH'
export const SET_FILTER = 'SET_FILTER'
export const SET_CATEGORY = 'SET_CATEGORY'
export const SET_USER_GIGS = 'SET_USER_GIGS'

const initialState = {
    gigs: [],
    userGigs: [],
    sortBy: 'recommended',
    filterBy: gigService.getDefaultFilter(),
}
export function gigReducer(state = initialState, action) {
    let gigs
    let filterBy
    let category
    let txt

    switch (action.type) {
        case ADD_GIG:
            console.log('action.gig:', action.gig)
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

        case SET_SORT:
            return { ...state, sortBy: action.sortBy }

        case SET_CATEGORY:
            filterBy = { ...state.filterBy, category: action.category }
            return { ...state, filterBy }

        case SET_SEARCH:
            filterBy = { ...state.filterBy, txt: action.txt }
            return { ...state, filterBy }

        default:
            return state
    }
} 