import React from 'react';
import OrderHistory from '../features/order/OrderHistory';
const History = () => {

    return (
        <>
            <div className="cartpage">
                <div style={{ backgroundColor: "#f8f8f8", padding: "4rem 2rem", gridColumn: "1/-1", }} >
                    HISTORY
                </div>
                <OrderHistory />
            </div>
        </>
    )
}

export default History;