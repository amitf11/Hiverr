import { useEffect, useRef } from "react"

export function OrderModal({ orders, isOrderModalOpen, onCloseOrderModal, modalPosition }) {
    const modalRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onCloseOrderModal()
            }
        }

        if (isOrderModalOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOrderModalOpen, onCloseOrderModal])


    function getStatusClass(order) {
        if (order.status === 'pending') return 'pending'
        else if (order.status === 'rejected') return 'rejected'
        else if (order.status === 'approved') return 'approved'
    }

    function getStatusTitle(order) {
        if (order.status === 'pending') return 'Pending'
        else if (order.status === 'rejected') return 'Canceled'
        else if (order.status === 'approved') return 'In progress'
    }

    if (!isOrderModalOpen) return null
    return (
        <section className="order-modal"
            style={{ left: modalPosition.left, top: modalPosition.top }}
        >
            <div className="modal-tip"></div>
            <div ref={modalRef} className="modal-content">
                <section className="orders-wrapper">
                    {!orders || !orders.length ? (
                        <div>No orders yet</div>
                    ) : (
                        orders.map(order => (
                            <article key={order._id} className="order-container flex align-center">
                                <a className="clean-link" href={`/gig/${order.gig._id}`}>
                                    <div className="img-container">
                                        <img src={order.gig.imgUrl} alt="gig-img" />
                                    </div>
                                </a>
                                <div>
                                    <a className="clean-link" href={`/gig/${order.gig._id}`}>
                                        <p>{order.gig.title}</p>
                                    </a>
                                    <div className="seller-status flex space-between">
                                        <span>by {order.seller.fullname}</span>
                                        <span className={`${getStatusClass(order)} order-status`}>{getStatusTitle(order)}</span>
                                    </div>
                                </div>
                            </article>
                        )))}

                </section>
            </div>
        </section>
    )
}
