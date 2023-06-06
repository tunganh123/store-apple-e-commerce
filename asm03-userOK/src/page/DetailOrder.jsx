import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Fetchdata } from '../utils/fetchdata';
import { convert } from './CheckoutPage';
import ProductOrderItem from './Cart/ProductOrderItem';
import { getCookie } from 'react-use-cookie';
const DetailOrder = () => {
    let token = getCookie("token");
    const [statedetailorder, setdetailorder] = useState()
    const iddetailorder = useParams().iddetail;
    useEffect(() => {
        const fetchdetailorder = async () => {
            const result = await Fetchdata({ iddetailorder: iddetailorder }, "getdetailorder", token)
            setdetailorder(result)
        }
        fetchdetailorder()
    }, [])
    return (
        <>
            <div className="cartpage">
                <div style={{ backgroundColor: "#f8f8f8", padding: "4rem 2rem", gridColumn: "1/-1", }} >
                    <h2>INFORMATION ORDER</h2>
                    <p>ID User: {statedetailorder?._id}</p>
                    <p>Full Name: {statedetailorder?.infoorder?.fullname}</p>
                    <p>Phone: {statedetailorder?.infoorder?.phone}</p>
                    <p>Address: {statedetailorder?.infoorder?.address}</p>
                    <p>Total: {convert(statedetailorder?.totalprice)}</p>
                </div>
                <h3 style={{ margin: "2rem auto" }}>HISTORY</h3>
                <div className="">
                    <div className="cartproduct_content">
                        <table className="table table-sm">

                            <tr className='test' style={{ display: "grid", gridTemplateColumns: "repeat(5,auto)", }}>
                                <th className='throw' >ID PRODUCT</th>
                                <th className='throw'>IMAGE</th>
                                <th className='throw'>NAME</th>
                                <th className='throw'>PRICE</th>
                                <th className='throw'>COUNT</th>
                                {
                                    statedetailorder?.products.map((item, i) => <ProductOrderItem key={i} item={item} />)
                                }

                            </tr>


                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailOrder;