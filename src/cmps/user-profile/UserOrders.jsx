export function UserOrders({ orders }) {
    console.log('orders:', orders)

    if (!orders || !orders.length) return <div> No orders to show...</div>
    return (

        <section className="user-orders">
            <h2>My Orders</h2>
            <section className="orders-container">
                {orders.map(order => (
                    <article className="flex column space-between order-card">
                        <img src={order.gig.imgUrl} alt="" />
                        <div>{order.gig.title}</div>
                        <div>By: {order.seller.fullname}</div>
                        <div className="flex space-between">
                            <div>${order.gig.price}</div>
                            <div>{order.status}</div>
                        </div>
                    </article>
                ))}
            </section>

        </section>
    )
}