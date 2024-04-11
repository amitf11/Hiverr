export function UserOrders({ buyerOrders }) {
    return (
        <section className="user-orders">
            <h2>My Orders</h2>
            {(!buyerOrders || !buyerOrders.length) ? <div> No orders to show...</div> : null}
            <section className="orders-container">
                {buyerOrders.map(order => (
                    <article className="flex column space-between order-card" key={order._id}>
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