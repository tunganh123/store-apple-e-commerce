import React from 'react';
import "./pagecss/CartPage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../UI/Button';
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import StateCart from '../store/StateCart';
import CartItem from './Cart/CartItem';
import { convert } from './CheckoutPage';
const CartPage = () => {
    // Khai báo total sản phẩm ban đầu
    let total = 0;
    // Khai báo navigate
    const navi = useNavigate()
    ///////////////////////////////////////////////////////////////////////////////////////
    const Stcart = useSelector((state) => state.cart)
    const action = StateCart.actions;
    // Khai báo dispatch
    const dispatch = useDispatch()
    ///////////////////////////////////////////////////////////////////////////////////////
    let userlogin = useSelector((state) => state.userlogin)
    const stcartfilter = Stcart.list.filter((item) => item.iduser == userlogin.iduser)
    // Tính tổng số tiền
    stcartfilter.forEach((cart) => {
        total += cart.count * cart.item.price
    })
    // Chuyển đổi định dạng
    total = convert(total)
    // Sự kiện xóa sản phẩm
    const clickdelete = (cart) => {
        dispatch(action.deletecart(cart))
    }
    // Hàm callback -  Sự kiện giảm số lượng sản phẩm
    const prev = (cart) => {
        let newcart = {
            ...cart, type: "prev"
        }
        dispatch(action.prevnextcart(newcart))
    }
    // Hàm callback -  Sự kiện tăng số lượng sản phẩm
    const next = (cart) => {
        let newcart = {
            ...cart, type: "next"
        }
        dispatch(action.prevnextcart(newcart))
    }
    return (
        <>

            <div className="cartpage">
                <div style={{ backgroundColor: "#f8f8f8", padding: "4rem 2rem", gridColumn: "1/-1", }} >
                    SHOP
                </div>
                <h3 style={{ margin: "2rem auto" }}>SHOPPING CART</h3>
                <div className="cart_product">
                    <div className="cartproduct_content">
                        <table className="table table-sm">
                            <thead>
                                <tr className='test'>
                                    <th className='throw' >IMAGE</th>
                                    <th className='throw'>PRODUCT</th>
                                    <th className='throw'>PRICE</th>
                                    <th className='throw'>QUANTITY</th>
                                    <th className='throw'>TOTAL</th>
                                    <th className='throw'>REMOVE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    stcartfilter.map((cart, i) => <CartItem click={clickdelete} prev={prev} next={next} key={i} cart={cart} />)
                                }
                            </tbody>
                        </table>
                        <div className="footercontent">
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <button onClick={() => navi("/shop")} style={{ border: "none", backgroundColor: "white" }}><FontAwesomeIcon icon="fa-solid fa-arrow-left" /></button>
                                <p style={{ display: "flex", alignItems: "center", margin: "auto", marginLeft: "0.3rem" }}>Continue shopping</p>


                            </div>
                            <div className="processcheckout">
                                <button variant="info" onClick={() => navi("/checkout")} style={{ padding: "0.5rem 1rem", backgroundColor: "white" }}>Proceed to checkout <FontAwesomeIcon icon="fa-solid fa-arrow-right" /></button>

                            </div>
                        </div>
                    </div>
                    <div className="cartproduct_total">
                        <h4 style={{ marginBottom: "2rem" }}>CART TOTAL</h4>
                        <div style={{ marginBottom: "1rem", borderBottom: "1px solid #ced4da" }} className="subtotal">
                            <h5>SUBTOTAL</h5>
                            <p>{total} VND</p>
                        </div>
                        <div style={{ marginBottom: "1rem" }} className="total">
                            <h5>TOTAL</h5>
                            <p>{total} VND</p>
                        </div>
                        <input style={{ width: "100%" }} type="text" className='form-control' placeholder='Enter your coupon' />
                        <Button style={{ width: "100%" }}> <FontAwesomeIcon style={{ color: "white" }} icon="fa-solid fa-gift" /> Apply coupon</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage;