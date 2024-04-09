import { gigService } from "../../services/gig.service"

export const SET_GIGS = 'SET_GIGS'
export const SET_FILTER = 'SET_FILTER'
export const SET_CATEGORY = 'SET_CATEGORY'
export const SET_SEARCH = 'SET_SEARCH'

const initialState = {
    gigs: [],
    filterBy: gigService.getDefaultFilter(),
    sortBy: { by: '', asc: true }
}

export function gigReducer(state = initialState, action) {
    let gigs
    let filterBy
    let category
    let search

    switch (action.type) {

        case SET_GIGS:
            return { ...state, gigs: action.gigs }

        case SET_FILTER:
            // search = state.filterBy.search
            // category = state.filterBy.category
            // filterBy = { ...action.filterBy, category, search }
            // return { ...state, filterBy: action.filterBy }

        return { ...state, filterBy: { ...state.filterBy, ...action.filterBy }}

        case SET_CATEGORY:
            console.log('action.category:', action.category)
            filterBy = { ...state.filterBy, category: action.category }
            console.log('filterBy:', filterBy)
            return { ...state, filterBy }

        case SET_SEARCH:
            filterBy = { ...state.filterBy, search: action.search }
            return { ...state, filterBy }

        default:
            return state
    }
} 