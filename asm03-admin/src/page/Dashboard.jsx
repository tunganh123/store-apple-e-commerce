import React, { useEffect, useState } from 'react';
import "../css/sb-admin-2.min.css"
import "../css/sb-admin-2.css"
import Sidebar from '../componend/UI/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fetchdataget } from '../utils/fetchdata';
import "../css/Dashboard.css"
import { convert } from '../utils/convert';
import Navi from '../componend/UI/Navi';
import { getCookie } from "react-use-cookie"
const Dashboard = () => {
    const [statetransaction, settransaction] = useState([])
    const tkadmin = getCookie("tokenadmin")
    useEffect(() => {
        const fetchtransaction = async () => {
            const result = await Fetchdataget("getalltransaction", tkadmin)
            settransaction(result)
        }
        fetchtransaction()
    }, [tkadmin])
    const total = statetransaction?.alltransaction?.reduce((tt, item) => {
        return tt = tt + item.totalprice
    }, 0)

    return (
        <>
            {/* Page Wrapper */}
            <div id="wrapper">
                {/* Sidebar */}
                <Sidebar />
                {/* End of Sidebar */}
                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        {/* Topbar */}
                        <Navi />
                        {/* End of Topbar */}
                        {/* Begin Page Content */}
                        <div className="container-fluid">
                            {/* Page Heading */}
                            {/* Content Row */}
                            <div className="row">
                                {/* Earnings (Monthly) Card Example */}
                                <div className="col-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{statetransaction?.usercount}</div>
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Clients</div>
                                                </div>
                                                <div className="col-auto">
                                                    <FontAwesomeIcon icon="fa-solid fa-user-plus" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Earnings (Monthly) Card Example */}
                                <div className="col-4">
                                    <div className="card border-left-success shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{convert(total)} VND</div>
                                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Earnings of Month</div>
                                                </div>
                                                <div className="col-auto">
                                                    <FontAwesomeIcon icon="fa-solid fa-dollar-sign" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Earnings (Monthly) Card Example */}
                                <div className="col-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{statetransaction?.alltransaction?.length}</div>
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        New Order</div>
                                                </div>
                                                <div className="col-auto">
                                                    <FontAwesomeIcon icon="fa-solid fa-file" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ padding: "12px", marginTop: "2rem" }}>
                                <h2 style={{ marginBottom: "2rem" }}>Your Transactions</h2>
                                <table className="table table-striped table-bordered" >
                                    <thead style={{ backgroundColor: "rgb(91, 177, 235)", color: "white" }}>
                                        <tr>
                                            <th scope="col">ID User</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Delivery</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {statetransaction?.alltransaction?.map((item, i) => {
                                            return <tr key={i}>
                                                <td>{item.useridorder}</td>
                                                <td>{item.infoorder.fullname}</td>
                                                <td>{item.infoorder.phone}</td>
                                                <td>{item.infoorder.address}</td>
                                                <td>{convert(item.totalprice)} VND</td>
                                                <td>Chưa Vận Chuyển</td>
                                                <td>Chưa Thanh Toán</td>
                                                <td><button style={{ padding: " 0.5rem 1rem", backgroundColor: " rgb(8, 161, 41)" }}>View</button></td>
                                            </tr>
                                        })
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

export default Dashboard;