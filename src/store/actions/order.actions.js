import { store } from '../store'
import { ADD_ORDER, SET_ORDERS, SET_ORDER_STATUS } from '../reducers/order.reducer.js'

import { orderService } from '../../services/order.service.js'

export async function loadOrders(userId) {
    try {
        const orders = await orderService.query(userId)
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

export async function setOrderStatus(order) {
    try {
        const updatedOrder = await orderService.updateStatus(order)
        store.dispatch({ type: SET_ORDER_STATUS, order: updatedOrder })
    } catch (err) {
        console.error('Error updating order status:', err)
        throw err
    }
}