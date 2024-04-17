import { useEffect, useRef, useState } from "react"
import { SHOW_MSG, eventBus, showUserMsg } from "../services/event-bus.service"
import { SOCKET_EVENT_NEW_CLIENT_ORDER, SOCKET_EVENT_ORDER_STATUS_UPDATED, socketService } from "../services/socket.service"

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const timeoutRef = useRef()

    useEffect(() => {
        eventBus.on(SHOW_MSG, (msg) => {
            setMsg(msg)
            if (timeoutRef.current) {
                timeoutRef.current = null
                clearTimeout(timeoutRef.current)
            }
            timeoutRef.current = setTimeout(closeMsg, 4000)
        })

        socketService.on(SOCKET_EVENT_NEW_CLIENT_ORDER, ({ username }) => {
            showUserMsg(`You have a New order from ${username}`)
        })

        socketService.on(SOCKET_EVENT_ORDER_STATUS_UPDATED, ({ sellerName, status }) => {
            showUserMsg(`Your order from ${sellerName} was ${status}`)
        })
        
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return <span></span>
    return <section className="user-msg">
        {msg}
    </section>
}