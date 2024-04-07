import { useSelector } from "react-redux"

export function Dashboard() {
    const orders = useSelector(storeState => storeState.orderModule.orders)

    function geStatusBgc(order) {
        if (order.status === 'pending') return '#ffbe5b'
        else if (order.status === 'rejected') return '#c43333'
        else if (order.status === 'approved') return '#1dbf73'
    }
    return (
        <section className="dashboard flex align-center justify-center">
            <section className="manage-orders flex column">
                <h2>Manage Orders</h2>
                <div className="order-table flex column">
                    <div class="table-head flex align-center">
                        {/* <div class="buyer-col">
                            <h4>Buyer</h4>
                        </div> */}
                        <div class="gig-col col">
                            <h4>Gig</h4>
                        </div>
                        <div class="due-on-col col">
                            <h4>Order Date</h4>
                        </div>
                        <div class="total-col col">
                            <h4>Total</h4>
                        </div>
                        <div class="status-col col">
                            <h4>Status</h4>
                        </div>
                    </div>

                    <div className="orders-container flex column">

                        {orders.map(order => (
                            <section className="table-row flex align-center space-between">
                                {/* <div className=""> */}
                                {/* <div>
                                        <img src="" alt="" />
                                    </div> */}
                                <div className="flex gig-col">
                                    <span>{order.gig.title}</span>
                                </div>
                                <div className="due-on-col">
                                    <span>
                                        07/04/2024
                                        {/* {order.date} */}
                                    </span>
                                </div>
                                <div className="total total-col">
                                    <span>US${order.gig.price}</span>
                                </div>
                                <div className="status-container status-col">
                                    <div className="status flex align-center justify-center" style={{ backgroundColor: geStatusBgc(order) }}>
                                        <span>{order.status}</span>
                                    </div>
                                </div>
                                {/* </div> */}
                            </section>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    )
}