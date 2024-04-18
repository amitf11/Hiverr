export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'
export const SET_ORDER_STATUS = 'SET_ORDER_STATUS'
export const CLEAR_NEW_ORDERS = 'CLEAR_NEW_ORDERS'
export const SET_SELLER_ORDERS = 'SET_SELLER_ORDERS'

const initialState = {
    orders: [],
    sellerOrders: [],
    newOrders: []
}

export function orderReducer(state = initialState, action) {
    let orders
    let newState
    switch (action.type) {

        case SET_ORDERS:
            newState = { ...state, orders: action.orders }
            return newState

        case SET_SELLER_ORDERS:
            newState = { ...state, sellerOrders: action.sellerOrders }
            return newState

        case ADD_ORDER:
            newState = {
                ...state,
                orders: [action.savedOrder, ...state.orders],
                newOrders: [action.savedOrder, ...state.newOrders]
            }
            return newState

        case SET_ORDER_STATUS:
            const orderIdx = state.sellerOrders.findIndex(order => order._id === action.order._id)
            newState = state.sellerOrders
            newState.splice(orderIdx, 1, action.order)
            return { ...state, sellerOrders: [...newState] }

        case CLEAR_NEW_ORDERS:
            return { ...state, newOrders: [] }

        default:
            return state
    }
}