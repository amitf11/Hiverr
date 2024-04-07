import { store } from '../store'
import { ADD_ORDER, SET_ORDERS } from '../reducers/order.reducer.js'

import { orderService } from '../../services/order.service'

export async function loadOrders() {
    try {
        const orders = await orderService.query()
        store.dispatch({ type: SET_ORDERS, orders })
    } catch (err) {
        console.log('Cannot load orders', err)
        throw err
    }
}

export async function addOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch({ type: ADD_ORDER, savedOrder })
        return savedOrder
    } catch (err) {
        console.log('Cannot add order', err)
        throw err
    }
}