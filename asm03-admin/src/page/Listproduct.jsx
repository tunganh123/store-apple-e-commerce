import { Input } from '../UI/Input';
import React, { useEffect, useState } from 'react';
import SpinnerMini from '../UI/SpinnerMini';
import { Button } from '../UI/Button';
import { getCookie } from "react-use-cookie"
import { Row } from '../UI/Row';
import { TitleTable } from '../UI/TitleTable';
import { Table } from '../UI/Table/Table';
import { useNavigate } from 'react-router-dom';
import { convert } from '../utils/convert';
import { DeleteProductMutate, GetListProductQuery } from '../Services/services';
import Pagination from '../UI/Pagination';
import { useSearchParams } from "react-router-dom"
const Listproduct = () => {
    const navi = useNavigate()
    const [statelistproduct, setlistproduct] = useState([])
    // State Lưu danh sách tất cả sản phẩm nhận đc từ fetch API
    const [statesearch, setsearch] = useState()
    const tkadmin = getCookie("tokenadmin")
    const { isLoading, data, isError } = GetListProductQuery(tkadmin)
    useEffect(() => {
        setlistproduct(data)
    }, [data])
    const { mutate, load } = DeleteProductMutate()
    const clickdelete = (item) => {
        if (window.confirm('Are you sure you wish to delete this Product?')) {
            mutate({ idproduct: item._id, token: tkadmin })
        }
    }
    const keydownhandler = (e) => {
        if (e.key == "Enter") {
            const arrlistfilter = data.filter((item) =>
                item.name.includes(statesearch)
            )
            setlistproduct(arrlistfilter)
        }
    }
    //////////PANIGATION
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));
    let startIndex = (currentPage - 1) * Number(process.env.REACT_APP_PAGE_SIZE);
    const endIndex = startIndex + Number(process.env.REACT_APP_PAGE_SIZE) - 1;
    const currentData = statelistproduct?.slice(startIndex, endIndex + 1);
    // Set data to render table
    let headers = ["STT", "_id", "name", "price", "count", "Image", "category", "Edit"]
    let datatable = currentData?.map((it) => {
        startIndex++
        return {
            ...it,
            STT: startIndex,
            price: `${convert(it.price)} VND`,
            Image: <img src={it.img1.includes("public") ? `${process.env.REACT_APP_URL_FETCH}/${it.img1}` : it.img1} style={{ width: "5rem", height: "5rem" }} alt="" />,
            Edit: <div style={{ display: "flex" }}>
                <Button onClick={() => navi(`/editproduct/${it._id}`)} sty={{ border: "1px solid  #00973f", backgroundColor: "#00973f" }}>Update</Button>
                <Button onClick={() => clickdelete(it)} sty={{ border: "1px solid  red", backgroundColor: "red" }}>Delete</Button>
            </div>
        } || []
    })
    return (
        <>
            {
                isLoading && <SpinnerMini />
            }
            {
                load && <SpinnerMini />
            }
            {
                isError && !isLoading && <div>Some thing wrong!!!</div>
            }
            {
                data &&
                <>
                    <Row style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <TitleTable >PRODUCT LIST</TitleTable>
                        <div>
                            <Input placeholder='Enter search!' onKeyDown={keydownhandler} onChange={(e) => setsearch(e.target.value)} value={statesearch} type="text" />
                        </div>
                    </Row>
                    <Row>
                        <Table headers={headers} data={datatable} />
                        <Pagination count={statelistproduct?.length} pagesize={Number(process.env.REACT_APP_PAGE_SIZE)} />
                    </Row>
                </>
            }
        </>
    )
}

export default Listproduct;