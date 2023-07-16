import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HistoryItem from './HistoryItem';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../UI/Spinner/Spinner';
import { OrderHistoryService } from '../../services/services';
import { useSearchParams } from 'react-router-dom';
import Pagination from "../../UI/Pagination/Pagination"
const OrderHistory = () => {
    const navi = useNavigate()
    let userlogin = useSelector((state) => state.userlogin)
    const { isLoading, isError, data } = OrderHistoryService(userlogin.iduser, userlogin.token)
    const [statehistory, sethistory] = useState()
    useEffect(() => {
        sethistory(data)
    }, [data])
    const clickhandler = (item) => {
        navi(`/detailorder/${item._id}`)
    }
    ////////////paginationm
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));
    let startIndex = (currentPage - 1) * Number(process.env.REACT_APP_PAGE_SIZE);
    const endIndex = startIndex + Number(process.env.REACT_APP_PAGE_SIZE) - 1;
    const currentData = statehistory?.slice(startIndex, endIndex + 1);
    return (
        <>
            <h3 style={{ margin: "2rem auto" }}>HISTORY</h3>
            <div className="">
                <div className="cartproduct_content">
                    <table className="table table-sm">
                        <tr className='test' style={{ display: "grid", gridTemplateColumns: "repeat(10,auto)", }}>
                            <th className='throw' >STT</th>
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
                                isLoading && <Spinner />
                            }
                            {
                                isError && !isLoading && <div>Some thing wrong!!!</div>
                            }

                            {
                                currentData?.map((item, i) => <HistoryItem startIndex={startIndex + i + 1} clickhandler={clickhandler} key={i} item={item} />)

                            }
                        </tr>
                    </table>
                    <Pagination count={statehistory?.length} pagesize={Number(process.env.REACT_APP_PAGE_SIZE)} />
                </div>
            </div>
        </>
    )
}

export default OrderHistory;