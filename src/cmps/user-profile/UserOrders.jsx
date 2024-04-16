import Chip from '@mui/material/Chip'

export function UserOrders({ buyerOrders }) {

    function capitalizeWords(str) {
        return str.replace(/\b\w/g, match => match.toUpperCase())
    }

    function getStatusColor(status) {
        if (status === 'pending') return '#ffbe5b'
        else if (status === 'rejected') return '#c43333'
        else if (status === 'approved') return '#1dbf73'
    }
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
                            <Chip label={capitalizeWords(order.status)} 
                            style={{ backgroundColor: getStatusColor(order.status), color: 'white' }} />
                        </div>
                    </article>
                ))}
            </section>

        </section>
    )
}