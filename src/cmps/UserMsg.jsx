import { useEffect, useRef, useState } from "react"
import { showUserMsg } from "../services/event-bus.service"
import { socketService } from "../services/socket.service"

export function UserMsg() {
    const [msg, setMsg] = useState('')
    const [timeoutRef] = useRef()

    useEffect(() => {
        setMsg(msg)
        if (timeoutRef.current) {
            timeoutRef.current = null
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(setMsg(null), 4000)
    })

    if (!msg) return null
    return <section className="user-msg">
        {msg.txt}
    </section>
}