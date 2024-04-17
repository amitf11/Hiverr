import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { UserImg } from "../../cmps/UserImg"
import { StatusModal } from "../../cmps/StatusModal"
import { loadOrders, setOrderStatus } from "../../store/actions/order.actions"

export function UserDashboard({ sellerOrders }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function geStatusBgc(order) {
        if (order.status === 'pending') return '#ffbe5b'
        else if (order.status === 'rejected') return '#c43333'
        else if (order.status === 'approved') return '#1dbf73'
    }

    function onOpenStatusModal(order) {
        setSelectedOrder(order)
        setIsModalOpen(true)
    }

    function onCloseModal() {
        setIsModalOpen(false)
    }

    function capitalizeWords(str) {
        return str.replace(/\b\w/g, match => match.toUpperCase())
    }

    function onChangeStatus(newStatus) {
        if (newStatus === 'Reject') newStatus = 'rejected'
        else newStatus = 'approved'
        if (selectedOrder) {
            const updatedOrder = { ...selectedOrder, status: newStatus }
            setOrderStatus(updatedOrder)
            setSelectedOrder(updatedOrder)
        }
        onCloseModal()
    }

    return (
        <section className="dashboard flex column align-center justify-center">
            <h2>Manage Your Services</h2>
            <section className="manage-orders flex column">
                {!sellerOrders || !sellerOrders.length ? (
                    <div>No orders yet</div>
                ) : (
                    <div className="order-table flex column">
                        <div className="table-head flex align-center">
                            {/* <div className="buyer-col">
                                <h4>Buyer</h4>
                            </div> */}
                            <div className="gig-col col">
                                <h4>Gig</h4>
                            </div>
                            {/* <div className="due-on-col col">
                                <h4>Order Date</h4>
                            </div> */}
                            <div className="total-col col">
                                <h4>Total</h4>
                            </div>
                            <div className="status-col col">
                                <h4>Status</h4>
                            </div>
                        </div>

                        <div className="orders-container flex column">
                            {sellerOrders ? sellerOrders.map(order => (
                                <section key={order._id} className="table-row flex align-center space-between">
                                    {/* <div className=""> */}
                                    {/* <div className="buyer-col">
                                        <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png" alt="" />
                                    </div> */}
                                    <div className="flex gig-col">
                                        <span>{order.gig.title}</span>
                                    </div>
                                    {/* <div className="due-on-col">
                                        <span> */}
                                    {/* 07/04/2024 */}
                                    {/* {order.date} */}
                                    {/* </span> */}
                                    {/* </div> */}
                                    <div className="total total-col">
                                        <span>US${order.gig.price}</span>
                                    </div>
                                    <div onClick={() => onOpenStatusModal(order)} className="status-container status-col">
                                        <div className="flex align-center status" style={{ backgroundColor: geStatusBgc(order) }}>
                                            <span>{capitalizeWords(order.status)}</span>
                                        </div>
                                        <StatusModal
                                            isModalOpen={isModalOpen}
                                            onChangeStatus={onChangeStatus}
                                            onCloseModal={onCloseModal} />
                                    </div>
                                </section>
                            )) : ''
                            }
                        </div>
                    </div>
                )}
            </section>
        </section>
    )
}