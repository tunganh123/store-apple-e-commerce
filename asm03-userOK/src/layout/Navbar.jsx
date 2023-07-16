import React from 'react';
import { Link, Outlet, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Navbar.css"
import { useDispatch, useSelector } from "react-redux"
import Statelogin from '../store/Statelogin';
import { useCookies } from 'react-cookie';
const Navbar = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const Stcart = useSelector((state) => state.cart)
    const actionuser = Statelogin.actions;
    // Khai báo dispatch
    const dispatch = useDispatch()
    ///////////////////////////////////////////////////////////////////////////////////////
    let userlogin = useSelector((state) => state.userlogin)
    // Khai báo total sản phẩm ban đầu
    let total = 0;
    // Click logout
    const clickLogout = async () => {
        removeCookie("token")
        dispatch(actionuser.logout())
    }
    const stcartfilter = Stcart.list.filter((item) => item.iduser == userlogin.iduser)
    // Lấy ra danh sách cart của người dung htai
    if (userlogin.length != 0) {
        // Tính tổng san pham
        stcartfilter.forEach((cart) => {
            total += cart.count
        })
    }
    return (
        <>
            <div className='navvv'>
                <div id='navbarr'>
                    <div>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/shop">Shop</NavLink>
                    </div>
                    <h2 >BOUTIQUE</h2>
                    <div>
                        {
                            userlogin && <NavLink to="/history">History </NavLink>
                        }
                        <NavLink to="/cart"><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> Cart ({total})</NavLink>
                        {
                            !userlogin ? <NavLink to="/login"><FontAwesomeIcon icon="fa-solid fa-user" /> Login </NavLink>
                                : <NavLink><FontAwesomeIcon icon="fa-solid fa-user" /> {userlogin.fullname} <FontAwesomeIcon icon="fa-solid fa-caret-down" /> <Link onClick={clickLogout}>( Logout )</Link></NavLink>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default Navbar;