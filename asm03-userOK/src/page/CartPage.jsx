import React from 'react';
import "./pagecss/CartPage.css"
import Cart from '../features/cart/Cart';
const CartPage = () => {

    return (
        <>

            <div className="cartpage">
                <div style={{ backgroundColor: "#f8f8f8", padding: "4rem 2rem", gridColumn: "1/-1", }} >
                    SHOP
                </div>
                <Cart />
            </div>
        </>
    )
}

export default CartPage;