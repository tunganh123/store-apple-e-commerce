import React, { useEffect, useState } from 'react';
import { Fetchdata } from '../utils/fetchdata';
import { useSelector } from 'react-redux';
import { getCookie } from 'react-use-cookie';
import HistoryItem from './Cart/HistoryItem';
import { useNavigate } from 'react-router-dom';
const History = () => {
    let token = getCookie("token");
    const navi = useNavigate()
    const [statehistory, sethistory] = useState([])
    let userlogin = useSelector((state) => state.userlogin)
    useEffect(() => {
        const fetchhistory = async () => {
            const result = await Fetchdata({ iduser: userlogin.iduser }, "getorder", token)
            sethistory(result)
        }
        fetchhistory()
    }, [])
    const clickhandler = (item) => {
        navi(`/detailorder/${item._id}`)
    }
    return (
        <>
            <div className="cartpage">
                <div style={{ backgroundColor: "#f8f8f8", padding: "4rem 2rem", gridColumn: "1/-1", }} >
                    HISTORY
                </div>
                <h3 style={{ margin: "2rem auto" }}>HISTORY</h3>
                <div className="">
                    <div className="cartproduct_content">
                        <table className="table table-sm">

                            <tr className='test' style={{ display: "grid", gridTemplateColumns: "repeat(9,auto)", }}>
                                <th className='throw' >ID ORDER</th>
                                <th className='throw'>ID USER</th>
                                <th className='throw'>NAME</th>
                                <th className='throw'>PHONE</th>
                                <th className='throw'>ADDRESS</th>
                                <th className='throw'>TOTAL</th>
                                <th className='throw'>DELIVERY</th>
                                <th className='throw'>STATUS</th>
                                <th className='throw'>DETAIL</th>
                                {
                                    statehistory?.map((item, i) => <HistoryItem clickhandler={clickhandler} key={i} item={item} />)
                                }
                            </tr>


                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default History;