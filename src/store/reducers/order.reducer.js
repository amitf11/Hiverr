export const SET_ORDERS = 'SET_ORDERS'
export const ADD_ORDER = 'ADD_ORDER'

const initialState = {
    orders: []
}

export function orderReducer(state = initialState, action) {
    let orders
    let newState
    switch (action.type) {
        case SET_ORDERS:
            newState = { ...state, orders: action.orders }
            break
        case ADD_ORDER:
            newState = { ...state, orders: [...state.orders, action.order] }
        default:
            return state
    }
    return newState
}