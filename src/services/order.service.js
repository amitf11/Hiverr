import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"

const STORAGE_KEY = 'orderDB'

async function query() {
    const orders = await storageService.query(STORAGE_KEY)
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

function _createOrders() {
    let orders = utilService.loadFromStorage(STORAGE_KEY)
    if (!orders || !orders.length) {
        orders = [
            {
                _id: utilService.makeId(),
                buyer: "mini-user",
                seller: "mini-user",
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