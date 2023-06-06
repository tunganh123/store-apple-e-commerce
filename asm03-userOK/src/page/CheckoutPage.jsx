import React, { useState } from 'react';
import Button from '../UI/Button';
import { useSelector } from 'react-redux';
import "./pagecss/Checkoutpage.css"
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from 'react-use-cookie';
import { Fetchdata } from "../utils/fetchdata"
// Hàm chuyển đổi định dạng số tiền
export const convert = (value) => {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
    });
    let vl = formatter.format(value);
    // Sử dụng glocal flag
    let res = vl.slice(1).replace(/,/g, ".")
    return res
}
const CheckoutPage = () => {
    const navi = useNavigate()
    let token = getCookie("token");
    // Lấy StateCart từ store
    let Stcart = useSelector((state) => state.cart)
    let userlogin = useSelector((state) => state.userlogin)
    const [statefullname, setstatefullname] = useState(userlogin?.fullname)
    const [stateemail, setstateemail] = useState(userlogin?.email)
    const [statephone, setstatephone] = useState(userlogin?.phone)
    const [stateaddress, setstateaddress] = useState("")
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
            console.log(item)
            return {
                count: item.count,
                product: item.item
            }
        })
        let data = {
            useridorder: userlogin.iduser,
            infoorder: {
                fullname: statefullname,
                email: stateemail,
                phone: statephone,
                address: stateaddress
            },
            products: products,
            timeorder: new Date(),
            totalprice: total1,
            status: "order"
        }
        const fetchorder = await Fetchdata(data, "addorder", token)
        if (fetchorder.err) {
            alert(fetchorder.err)
            return
        }
        navi("/history")

    }
    return (
        <>
            <div className="checkoutpage">
                <div className="cart_product">

                    <div className="cartproduct_content">
                        <h2 style={{ marginBottom: "2rem" }}  ><i>BILLING DETAILS</i> </h2>
                        <form>
                            <div className="form-outline mb-4">
                                <div className='inputlabl'>
                                    <label htmlFor="">FULL NAME:</label> <br />
                                    <input value={statefullname} onChange={(e) => setstatefullname(e.target.value)} style={{ width: "100%", height: "3rem", borderRadius: "0px" }} type="text" placeholder='Enter Your Full Name Here' className="form-control" />
                                </div>
                                <div className='inputlabl'>
                                    <label htmlFor="">EMAIL:</label> <br />
                                    <input value={stateemail} onChange={(e) => setstateemail(e.target.value)} style={{ width: "100%", height: "3rem", borderRadius: "0px" }} type="email" placeholder='Enter Your Email Here' className="form-control" />
                                </div >
                                <div className='inputlabl'>
                                    <label htmlFor="">PHONE NUMBER:</label> <br />
                                    <input value={statephone} onChange={(e) => setstatephone(e.target.value)} style={{ width: "100%", height: "3rem", borderRadius: "0px" }} type="number" placeholder='Enter Your Phone Number Here' className="form-control" />
                                </div>
                                <div className='inputlabl'>
                                    <label htmlFor="">ADDRESS:</label> <br />
                                    <input value={stateaddress} onChange={(e) => setstateaddress(e.target.value)} style={{ width: "100%", height: "3rem", borderRadius: "0px" }} type="text" placeholder='Enter Your Address Here' className="form-control" />
                                </div>

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
            </div>

        </>
    )
}

export default CheckoutPage;