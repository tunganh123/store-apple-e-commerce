import React from 'react';
import { Link } from 'react-router-dom';
const Sidebar = () => {
    return (
        <>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* Sidebar - Brand */}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to={"/dashboard"} >
                    <div className="sidebar-brand-text mx-3">Admin Page </div>
                </Link>
                {/* Divider */}
                <hr className="sidebar-divider my-0" />
                {/* Nav Item - Dashboard */}
                <div className="sidebar-heading">
                    MAIN
                </div>
                <li className="nav-item ">
                    <Link className="nav-link collapsed" to={"/dashboard"}>
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item ">
                    <Link className="nav-link collapsed" to={"/livechat"}>
                        <span>Live Chat</span>
                    </Link>
                </li>
                {/* Divider */}
                <hr className="sidebar-divider" />
                {/* Heading */}
                <div className="sidebar-heading">
                    LISTS
                </div>
                {/* Nav Item - Pages Collapse Menu */}
                <li className="nav-item">
                    <Link className="nav-link collapsed" to={"/listproduct"}>
                        <span>Product</span>
                    </Link>
                </li>
                {/* Divider */}
                <hr className="sidebar-divider" />
                {/* Heading */}
                <div className="sidebar-heading">
                    NEW
                </div>
                {/* Nav Item - Pages Collapse Menu */}
                <li className="nav-item">
                    <Link className="nav-link collapsed" to={"/addproduct"}  >
                        <span>New Product</span>
                    </Link>
                </li>
                {/* Divider */}
                <hr className="sidebar-divider" />
                {/* Heading */}
                <div className="sidebar-heading">
                    USER
                </div>
                {/* Nav Item - Pages Collapse Menu */}
                <li className="nav-item">
                    <Link className="nav-link" to={"/login"} >
                        <span>Login</span>
                    </Link>
                </li>


            </ul>

        </>
    )
}

export default Sidebar;