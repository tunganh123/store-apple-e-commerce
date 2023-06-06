
import Sidebar from '../componend/UI/Sidebar';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Fetchdataget, Fetchdata } from '../utils/fetchdata';
import ProductItem from './item/ProductItem';
import Navi from '../componend/UI/Navi';
import { getCookie } from "react-use-cookie"
const Listproduct = () => {
    const [statelistproduct, setlistproduct] = useState([])
    // Khi vào trang thì set cho chạy phần useEff 2 lần
    const [statecheck, setstatecheck] = useState(false)
    // State Lưu danh sách tất cả sản phẩm nhận đc từ fetch API
    const [state, setstate] = useState([])
    const [statesearch, setsearch] = useState()
    const tkadmin = getCookie("tokenadmin")
    useEffect(() => {
        const fetchlistproduct = async () => {
            const result = await Fetchdataget("getallproduct", tkadmin)
            if (!result.err) {
                setlistproduct(result)
                setstate(result)
            }
        }
        fetchlistproduct()
        setstatecheck(true)
    }, [statecheck])
    const clickdelete = (item) => {
        if (window.confirm('Are you sure you wish to delete this Product?')) {
            const fetchdelete = async () => {
                const checkdelete = await fetch(`${process.env.REACT_APP_URL_FETCH}/deletedetail/${item._id}`, {
                    method: "DELETE",
                })
                if (checkdelete?.err) {
                    alert(checkdelete.err)
                }
            }
            fetchdelete()
        }
        setstatecheck((prev) => !prev)
    }
    const keydownhandler = (e) => {
        if (e.key == "Enter") {
            const arrlistfilter = state.filter((item) =>
                item.name.includes(statesearch)
            )
            setlistproduct(arrlistfilter)
        }
    }
    return (
        <>
            {/* Page Wrapper */}
            <div id="wrapper">
                {/* Sidebar */}
                <Sidebar />
                {/* End of Sidebar */}
                {/* Content Wrapper */}
                <div style={{ padding: "2rem" }} id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        <Navi />
                        {/* Topbar */}
                        <div className="container-fluid">
                            <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h2 >PRODUCT LIST</h2>
                                <div style={{ display: "flex" }}>
                                    <input placeholder='Enter search!' onKeyDown={keydownhandler} onChange={(e) => setsearch(e.target.value)} value={statesearch} type="text" className='form-control' />
                                </div>
                            </div>
                            <div>
                                <table className="table table-striped table-bordered" >
                                    <thead style={{ backgroundColor: "rgb(91, 177, 235)", color: "white" }}>
                                        <tr >
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Count</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {statelistproduct?.map((item, i) => <ProductItem clickdelete={clickdelete} key={i} item={item} i={i} />)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </div>
                    {/* End of Main Content */}
                    {/* Footer */}
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright © Your Website 2023</span>
                            </div>
                        </div>
                    </footer>
                    {/* End of Footer */}
                </div>
                {/* End of Content Wrapper */}
            </div>
        </>
    )
}

export default Listproduct;