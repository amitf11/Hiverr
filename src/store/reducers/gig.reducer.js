import { gigService } from "../../services/gig.service"

export const SET_GIGS = 'SET_GIGS'
export const SET_FILTER = 'SET_FILTER'
export const SET_CATEGORY = 'SET_CATEGORY'
export const SET_SEARCH = 'SET_SEARCH'

const initialState = {
    gigs: [],
    filterBy: { search: "", category: "", maxPrice: Infinity, minPrice: -Infinity },
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
            search = state.filterBy.search
            category = state.filterBy.category
            filterBy = { ...action.filterBy, category, search}
            return { ...state, filterBy: action.filterBy }

        case SET_CATEGORY:
            filterBy = { ...state.filterBy, category: action.category }
            return { ...state, filterBy }

        case SET_SEARCH:
            filterBy = { ...state.filterBy, search: action.search }
            return { ...state, filterBy }

        default:
            return state
    }
} 