import { utilService } from "./util.service"
import { storageService } from "./async-storage.service"
import { httpService } from "./http.service"

export const orderService = {
    query,
    save,
    updateStatus,
    sellerQuery
}

const STORAGE_KEY = 'orderDB'
const BASE_URL = 'order'

async function query(userId) {
    // const orders = await storageService.query(STORAGE_KEY)
    // const userOrders = orders.filter(order => order.buyer._id === userId)
    // return userOrders
    return httpService.get(BASE_URL, { params: userId })
}

async function sellerQuery(userId) {
    const orders = await storageService.query(STORAGE_KEY)
    const filteredOrders = orders.filter(order => order.seller._id === userId)
    return filteredOrders
}

async function save(order) {
    let savedOrder
    if (order._id) {
        // savedOrder = await storageService.put(STORAGE_KEY, order)
        savedOrder = await httpService.put(`${BASE_URL}/${order._id}`, order)
    } else {
        // savedOrder = await storageService.post(STORAGE_KEY, order)
        savedOrder = await httpService.post(BASE_URL, order)
    }
    return savedOrder
}

async function updateStatus(order) {
    try {
        // const savedOrder = await storageService.put(STORAGE_KEY, order)
        const savedOrder = await httpService.put(BASE_URL)
        return savedOrder
    } catch (err) {
        console.error('Error updating order status:', err);
        throw err
    }
}

function _createOrders() {
    let orders = utilService.loadFromStorage(STORAGE_KEY)
    if (!orders || !orders.length) {
        orders = [
            {
                _id: utilService.makeId(),
                buyer: { _id: 123, fullName: "mini-user" },
                seller: { _id: 123, fullName: "mini-user" },
                gig: {
                    _id: "i101",
                    name: "Design Logo",
                    imgUrl: "",
                    price: 20
                },
                status: "pending/approved/rejected"
            }
        ]
    }
    utilService.saveToStorage(STORAGE_KEY, orders)
    return orders
}