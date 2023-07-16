import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { convert } from '../../utils/convert';
import ProductOrderItem from './ProductOrderItem';
import Spinner from '../../UI/Spinner/Spinner';
import { OrderDetailService } from '../../services/services';
import { useSelector } from 'react-redux';
const Detailorder = () => {
    let userlogin = useSelector((state) => state.userlogin)
    const iddetailorder = useParams().iddetail;
    const { isLoading, isError, data } = OrderDetailService(iddetailorder, userlogin.token)
    const [statedetailorder, setdetailorder] = useState()
    useEffect(() => {
        setdetailorder(data)
    }, [data])
    return (
        <>
            <div style={{ backgroundColor: "#f8f8f8", padding: "4rem 2rem", gridColumn: "1/-1", }} >
                <h2>INFORMATION ORDER</h2>
                <p>ID User: {statedetailorder?._id}</p>
                <p>Full Name: {statedetailorder?.infoorder?.fullname}</p>
                <p>Phone: {statedetailorder?.infoorder?.phone}</p>
                <p>Address: {statedetailorder?.infoorder?.address}</p>
                <p>Total: {convert(statedetailorder?.totalprice)}</p>
            </div>
            <h3 style={{ margin: "2rem auto" }}>HISTORY</h3>
            <div >
                <div className="cartproduct_content">
                    <table className="table table-sm">
                        <tr className='test' style={{ display: "grid", gridTemplateColumns: "repeat(6,auto)", }}>
                            <th className='throw' >STT</th>
                            <th className='throw' >ID PRODUCT</th>
                            <th className='throw'>IMAGE</th>
                            <th className='throw'>NAME</th>
                            <th className='throw'>PRICE</th>
                            <th className='throw'>COUNT</th>
                            {
                                isLoading && <Spinner />
                            }
                            {
                                isError && !isLoading && <div>Some thing wrong!!!</div>
                            }

                            {
                                statedetailorder?.products.map((item, i) => <ProductOrderItem key={i} index={i} item={item} />)
                            }

                        </tr>


                    </table>
                </div>
            </div>
        </>
    )
}

export default Detailorder;