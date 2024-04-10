import { utilService } from "./util.service"
import { storageService } from "./async-storage.service"

export const orderService = {
    query,
    save,
    updateStatus
}

const STORAGE_KEY = 'orderDB'

async function query(userId) {
    const orders = await storageService.query(STORAGE_KEY)
    const userOrders = orders.filter(order => order.buyer._id === userId)
    return orders
}

async function save(order) {
    let savedOrder
    if (order._id) {
        savedOrder = await storageService.put(STORAGE_KEY, order)
    } else {
        savedOrder = await storageService.post(STORAGE_KEY, order)
    }
    return savedOrder
}

async function updateStatus(order) {
    try {
        const savedOrder = await storageService.put(STORAGE_KEY, order)
        console.log('savedOrder:', savedOrder)
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
                buyer: { _id: 123, fullName: "mini-user"},
                seller: { _id: 123, fullName: "mini-user"},
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