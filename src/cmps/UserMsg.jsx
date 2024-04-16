import { useEffect, useRef, useState } from "react"
import { showUserMsg } from "../services/event-bus.service"
import { SOCKET_EVENT_ORDER_ADDED, SOCKET_EVENT_ORDER_UPDATED, socketService } from "../services/socket.service"

export function UserMsg() {
    const [msg, setMsg] = useState('')
    const timeoutRef = useRef()

    useEffect(() => {
        if (msg) {
            timeoutRef.current = setTimeout(() => {
                setMsg(null);
            }, 4000);
        }
        // setMsg(msg)
        // // window.scrollTo({ top: 0, behavior: 'smooth' })
        // if (timeoutRef.current) {
        //     timeoutRef.current = null
        //     clearTimeout(timeoutRef.current)
        // }
        timeoutRef.current = setTimeout(setMsg(null), 4000)

        socketService.on(SOCKET_EVENT_ORDER_ADDED, (userName) => {
            showUserMsg(`You have a New order from ${userName}`)
        })

        socketService.on(SOCKET_EVENT_ORDER_UPDATED, ({ sellerName, status }) => {
            showUserMsg(`Your order from ${sellerName} was ${status}`)
        })
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
    }, [msg])

    if (!msg) return <span></span>
    return <section className="user-msg">
        {msg.txt}
    </section>
}