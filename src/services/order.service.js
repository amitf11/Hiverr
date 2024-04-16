import { utilService } from "./util.service"
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
    return httpService.get(BASE_URL + '/buyer')
}

async function sellerQuery(userId) {
    return httpService.get(BASE_URL + '/seller')
}

async function save(order) {
    let savedOrder
    if (order._id) {
        savedOrder = await httpService.put(`${BASE_URL}/${order._id}`, order)
    } else {
        savedOrder = await httpService.post(BASE_URL, order)
    }
    return savedOrder
}

async function updateStatus(order) {
    try {
        const savedOrder = await httpService.put(`${BASE_URL}/${order._id}`, order)
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
                buyer: { _id: 123, fullname: "mini-user" },
                seller: { _id: 123, fullname: "mini-user" },
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