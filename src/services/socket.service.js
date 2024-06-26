import io from 'socket.io-client'
import { userService } from './user.service'

// Chat
export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg'
export const SOCKET_EMIT_SEND_MSG = 'chat-send-msg'
export const SOCKET_EMIT_SET_TOPIC = 'chat-set-topic'

// Orders
export const SOCKET_EVENT_NEW_CLIENT_ORDER = 'new-client-order'
export const SOCKET_EVENT_ORDER_STATUS_UPDATED = 'order-status-updated'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'
const SOCKET_EMIT_WATCH_USER = 'user-watch'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

// for debugging from console
window.socketService = socketService

socketService.setup()

function createSocketService() {
    var socket = null
    const socketService = {
        setup() {
            socket = io(baseUrl)
            const user = userService.getLoggedinUser()
            if (user) this.login(user._id)
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return;
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            console.log('data:', data)
            socket.emit(eventName, data)
        },
        login(userId) {
            socket.emit(SOCKET_EMIT_LOGIN, userId)
        },
        logout() {
            socket.emit(SOCKET_EMIT_LOGOUT)
        },
        terminate() {
            socket = null
        },
        watchUser(userId) {
            socket.emit(SOCKET_EMIT_WATCH_USER, userId)
        }

    }
    return socketService
}
