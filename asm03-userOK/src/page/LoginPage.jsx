import Button from '../UI/Button';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./pagecss/Login.css"
import Statelogin from '../store/Statelogin';
import { useRef, useState } from 'react';
import { } from "@reduxjs/toolkit"
import { useDispatch } from 'react-redux';
import { Fetchdata } from '../utils/fetchdata';
import jwt_decode from "jwt-decode"
import { setCookie } from 'react-use-cookie';
const LoginPage = () => {
    // State để cập nhật lỗi khi nhập k đúng qđ
    const [stateemail, setemail] = useState("email")
    const [statepassword, setpassword] = useState("Password")
    // Khai báo navigate
    const navi = useNavigate()
    // Ref gắn 2 thẻ input
    const emailref = useRef()
    const passwordref = useRef()
    // Khai báo dispatch
    const dispatch = useDispatch()
    // Lấy các hàm action từ Statelogin
    const action = Statelogin.actions;

    // Sự kiện đăng nhập
    const submitHandler = async (e) => {
        e.preventDefault()
        ///Validate du lieu
        if (emailref.current.value.trim() == "") {
            setemail("Vui lòng nhập email")
            emailref.current.classList.add("redd")
            return
        }
        // Check dữ liệu pass
        if (passwordref.current.value.trim() == "") {
            setpassword("Vui lòng nhập password")
            passwordref.current.classList.add("redd")
            return
        }
        let datalogin = {
            email: emailref.current.value,
            password: passwordref.current.value
        }
        const result = await Fetchdata(datalogin, "login")
        if (result.err) {
            alert(result.err)
            return
        }
        setCookie("token", result.token)
        const resultvalue = jwt_decode(result.token)
        dispatch(action.login(resultvalue))
        navi("/")

    }
    return (
        <>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration" style={{ borderRadius: 15 }}>
                                <div className="card-body p-4 p-md-5  ">
                                    <h2 className="mb-4 pb-2 pb-md-0 mb-md-5 " style={{ display: "flex", justifyContent: "center" }} ><i>Sign In</i> </h2>
                                    {/* Email input */}
                                    <form onSubmit={submitHandler}>
                                        <div className="form-outline mb-4">
                                            <input ref={emailref} style={{ height: "3.5rem", borderRadius: "0px" }} type="email" id="form2Example1" placeholder={stateemail} className="form-controls" />
                                            <input ref={passwordref} style={{ borderTop: "none", height: "3.5rem", borderRadius: "0px" }} type="password" id="form2Example2" placeholder={statepassword} className="form-clontrol" />
                                        </div>
                                        <Button style={{ width: "100%", padding: "20px 20px", margin: "30px auto" }}>SIGN IN</Button>
                                        {/* Register buttons */}
                                        <div className="text-center">
                                            <p>  <i>Create an account?</i>  <Link to="/register">Sign up</Link></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </>
    )
}

export default LoginPage;