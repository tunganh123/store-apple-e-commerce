
import Button from '../UI/Button';
import React, { } from "react";
import ReactDOM from "react-dom/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from "@reduxjs/toolkit";
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from "react-redux";
import Statedetail from '../store/Statedetail';
import "./Popup.css"
import { useNavigate } from 'react-router-dom';
import { convert } from '../page/CheckoutPage';
import { url_be } from '..';
const Popup = () => {
    // Khai baó navigate
    const navi = useNavigate()
    // Khai báo dispatch
    const dispatch = useDispatch()
    // Lấy action từ Statedetail
    const action = Statedetail.actions;
    // Lấy statedetail
    const detail = useSelector((state) => state.detail)
    // Lấy ra thẻ 
    const modal = document.getElementById("modal")
    const opa = document.querySelector(".opa")
    // Kiểm tra ban đầu
    if (detail.detail == "") {
        return
    }
    // click close vào modal
    const clickClose = () => {
        dispatch(action.hide_popup())
        opa.classList.add("hidden")
    }
    // Click vào xem chi tiết sp
    const clickHandler = () => {
        dispatch(action.hide_popup())
        opa.classList.add("hidden")
        navi(`/detail/${detail.detail._id}`)
    }
    // Chuyển đổi dạng số => chuỗi price
    let price = convert(detail.detail.price)
    let pathimg = detail.detail?.img1;
    if (detail.detail?.img1?.includes("public")) {
        pathimg = `${url_be}/${detail.detail?.img1}`
    }
    return (
        createPortal(
            <div className=' popup'>
                <button onClick={clickClose} className='close'>X</button>
                <div>
                    <img src={pathimg} alt="" />
                </div>
                <div>
                    <h4>{detail.detail.name}</h4>
                    <p>{price} VND</p>
                    <p>{detail.detail.short_desc}</p>
                    <Button onClick={clickHandler}><FontAwesomeIcon icon="fa-solid fa-cart-shopping" />  View Detail</Button>
                </div>
            </div>, modal)
    )
}

export default Popup;