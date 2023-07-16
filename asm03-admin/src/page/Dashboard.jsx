import React, { useEffect, useState } from 'react';
import "../css/sb-admin-2.min.css"
import "../css/sb-admin-2.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../css/Dashboard.css"
import { convert } from '../utils/convert';
import { getCookie } from "react-use-cookie"
import { Row } from '../UI/Row';
import { SquareHome } from '../UI/SquareHome';
import { Table } from '../UI/Table/Table';
import { TitleTable } from '../UI/TitleTable';
import { GetTransactionQuery } from '../Services/services';
import SpinnerMini from '../UI/SpinnerMini';
import Pagination from '../UI/Pagination';
import { useSearchParams } from "react-router-dom"
const Dashboard = () => {
    const [statetransaction, settransaction] = useState([])
    const tkadmin = getCookie("tokenadmin")
    const { isLoading, data, isError } = GetTransactionQuery(tkadmin)
    useEffect(() => {
        settransaction(data)
    }, [data])
    const total = statetransaction?.alltransaction?.reduce((tt, item) => {
        return tt = tt + item.totalprice
    }, 0)
    //////////////////Panigation
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    // Thiết lập data để render table
    let headers = ["STT", "useridorder", "fullname", "phone", "address", "totalprice", "delivery", "status", "Detail"]
    let dat = statetransaction?.alltransaction || []

    let startIndex = (currentPage - 1) * Number(process.env.REACT_APP_PAGE_SIZE);
    const endIndex = startIndex + Number(process.env.REACT_APP_PAGE_SIZE) - 1;
    const currentData = dat.slice(startIndex, endIndex + 1);

    let datatable = currentData.map((it, i) => {
        startIndex++
        return {
            ...it,
            ...it.infoorder,
            STT: startIndex,
            delivery: "Chưa vận chuyển",
            status: "Chưa thanh toán",
            Detail: functionName()
        }
    })
    function functionName() {
        return <button style={{ padding: " 0.5rem 1rem", backgroundColor: " rgb(8, 161, 41)" }}>View</button>
    };
    return (
        <>
            {
                isLoading && <SpinnerMini />
            }
            {
                isError && !isLoading && <div>Some thing wrong!!!</div>
            }
            {
                data &&
                <>
                    <Row>
                        <SquareHome value={statetransaction?.usercount} lett="Clients">
                            <FontAwesomeIcon icon="fa-solid fa-user-plus" />
                        </SquareHome>
                        <SquareHome value={`${convert(total)} VND`} lett="Earnings of Month">
                            <FontAwesomeIcon icon="fa-solid fa-dollar-sign" />
                        </SquareHome>
                        <SquareHome value={statetransaction?.alltransaction?.length} lett="New Order">
                            <FontAwesomeIcon icon="fa-solid fa-file" />
                        </SquareHome>
                    </Row>
                    <Row style={{ padding: "12px", marginTop: "2rem" }}>
                        <TitleTable style={{ marginBottom: "2rem" }}>Your Transactions</TitleTable>
                        <Table headers={headers} data={datatable} />
                        <Pagination count={dat.length} pagesize={Number(process.env.REACT_APP_PAGE_SIZE)} />
                    </Row>
                </>
            }
        </>
    )
}

export default Dashboard;