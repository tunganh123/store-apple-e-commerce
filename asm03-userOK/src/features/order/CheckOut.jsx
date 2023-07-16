import React, { useState } from 'react';
import Button from '../../UI/Button/Button';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { convert } from '../../utils/convert';
import { CheckoutMutate } from '../../services/services';
import { InputLable } from '../../UI/Input/Input';
const CheckOut = () => {
    /// useMutate
    const { mutate } = CheckoutMutate()
    // Lấy StateCart từ store
    let Stcart = useSelector((state) => state.cart)
    let userlogin = useSelector((state) => state.userlogin)
    const [stateform, setform] = useState({
        fullname: userlogin?.fullname,
        email: userlogin?.email,
        phone: userlogin?.phone,
        address: ""
    })
    ///////////////////////////////////////////////////////////////////////////////////////
    let total1 = 0;
    const stcartfilter = Stcart.list.filter((item) => item.iduser == userlogin.iduser)
    // Tính tổng số tiền
    stcartfilter.forEach((cart) => {
        total1 += cart.count * cart.item.price
    })
    let total = convert(total1)
    // click order
    const clickorder = async () => {
        const products = stcartfilter.map((item) => {
            return {
                count: item.count,
                product: item.item
            }
        })
        let data = {
            useridorder: userlogin.iduser,
            infoorder: stateform,
            products: products,
            timeorder: new Date(),
            totalprice: total1,
            status: "order"
        }
        mutate({ data: data, token: userlogin.token })
    }
    // update state input
    const changestate = (e) => {
        setform((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    return (
        <>
            <div className="cart_product">
                <div className="cartproduct_content">
                    <h2 style={{ marginBottom: "2rem" }}  ><i>BILLING DETAILS</i> </h2>
                    <form>
                        <div className="form-outline mb-4">
                            <InputLable value={stateform.fullname} name='fullname' type="text" placeholder='Enter Your Full Name Here' onChange={changestate} />
                            <InputLable name='phone' value={stateform.phone} onChange={changestate} type="email" placeholder='Enter Your Email Here' />
                            <InputLable name='phone' value={stateform.phone} type="number" placeholder='Enter Your Phone Number Here' onChange={changestate} />
                            <InputLable name='address' value={stateform.address} type="text" placeholder='Enter Your Address Here' onChange={changestate} />
                        </div>
                        <Link to=""><Button onClick={clickorder}>Place order</Button></Link>
                    </form>
                </div>
                <div className="cartproduct_total">
                    <h4 style={{ marginBottom: "2rem" }}>YOUR ORDER</h4>
                    {
                        stcartfilter.map((cart) => <>
                            <div style={{ marginBottom: "1rem", borderBottom: "1px solid #ced4da" }} className="subtotal">
                                <h5>{cart.item.name}</h5>
                                <p>{convert(cart.item.price)} VND x {cart.count}</p>
                            </div>
                        </>)
                    }
                    <div style={{ marginBottom: "1rem" }} className="total">
                        <h5>TOTAL</h5>
                        <p>{total} VND</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CheckOut;