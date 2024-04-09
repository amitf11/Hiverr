import { useEffect, useRef } from "react"

export function StatusModal({ isModalOpen, onChangeStatus, onCloseModal }) {
    const modalRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onCloseModal()
            }
        }

        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isModalOpen, onCloseModal])

    if (!isModalOpen) return null
    return (
        <div ref={modalRef} className="flex column set-status">
            <div onClick={() => onChangeStatus('approved')} className="flex align-center justify-center status approved">Approved</div>
            <div onClick={() => onChangeStatus('pending')} className="flex align-center justify-center status pending">Pending</div>
            <div onClick={() => onChangeStatus('rejected')} className="flex align-center justify-center status rejected">Rejected</div>
        </div>
    )
}