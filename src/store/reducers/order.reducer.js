export const SET_ORDERS = 'SET_ORDERS'
export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDER_STATUS = 'SET_ORDER_STATUS'
export const CLEAR_NEW_ORDERS = 'CLEAR_NEW_ORDERS'

const initialState = {
    orders: [],
    newOrders: []
}

export function orderReducer(state = initialState, action) {
    let orders
    let newState
    switch (action.type) {
        case SET_ORDERS:
            newState = { ...state, orders: action.orders }
            return newState
        case ADD_ORDER:
            newState = { ...state, orders: [...state.orders, action.savedOrder], newOrders: [...state.newOrders, action.savedOrder] }
            return newState
        case SET_ORDER_STATUS:
            const orderIdx = state.orders.findIndex(order => order._id === action.order._id)
            newState = state.orders
            newState.splice(orderIdx, 1, action.order)
            return { ...state, orders: [...newState] }
        case CLEAR_NEW_ORDERS:
            return { ...state, newOrders: [] }
        default:
            return state
    }
}