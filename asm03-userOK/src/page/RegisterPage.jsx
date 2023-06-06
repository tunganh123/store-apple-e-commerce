
import Button from '../UI/Button';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./pagecss/Register.css"
import { Fetchdata, Fetchdataget } from '../utils/fetchdata';
const RegisterPage = () => {
    const [statename, setname] = useState("Full Name")
    const [stateemail, setemail] = useState("email")
    const [statepassword, setpassword] = useState("Password")
    const [statephone, setphone] = useState("Phone")
    const navi = useNavigate()
    const nameref = useRef("")
    const emailref = useRef("")
    const passwordref = useRef("")
    const phoneref = useRef("")
    const submitHandler = (e) => {
        e.preventDefault()
        let check = true;
        // Check dữ liệu username
        if (nameref.current.value.trim() == "") {
            setname("Vui lòng nhập full name")
            nameref.current.classList.add("redd")
            check = false
        }
        // Check dữ liệu email
        if (emailref.current.value.trim() == "") {
            setemail("Vui lòng nhập email")
            emailref.current.classList.add("redd")
            check = false
        }
        // Check dữ liệu pass
        if (passwordref.current.value.trim() == "") {
            setpassword("Vui lòng nhập password")
            passwordref.current.classList.add("redd")
            check = false
        }
        // Check dữ liệu Phone
        if (phoneref.current.value.trim() == "") {
            setphone("Vui lòng nhập phone")
            phoneref.current.classList.add("redd")
            check = false
        }
        // Check pass< 8 ký tự
        if (check && passwordref.current.value.trim().length <= 8) {
            alert("Password phải lớn hơn 8 ký tự")
            check = false
        }
        let user = {
            fullname: nameref.current.value,
            email: emailref.current.value,
            password: passwordref.current.value,
            phone: phoneref.current.value

        }
        if (check) {
            const fetchregister = async () => {
                try {
                    const result = await Fetchdata(user, "register")
                    if (result.err) {
                        alert(result.err)
                        return
                    }
                    navi("/login")
                } catch (error) {
                    console.log(error)
                }
            }
            fetchregister()
        }
    }
    return (
        <>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration" style={{ borderRadius: 15 }}>
                                <div className="card-body p-4 p-md-5  ">
                                    <h2 className="mb-4 pb-2 pb-md-0 mb-md-5 " style={{ display: "flex", justifyContent: "center" }} ><i>Sign Up</i> </h2>
                                    {/* Email input */}
                                    <form onSubmit={submitHandler}>
                                        <div className="form-outline mb-4">
                                            <input ref={nameref} style={{ height: "3.5rem", borderRadius: "0px" }} type="text" placeholder={statename} className="form-controll" />
                                            <input ref={emailref} style={{ borderTop: "none", height: "3.5rem", borderRadius: "0px" }} type="email" placeholder={stateemail} className="form-controll" />
                                            <input ref={passwordref} style={{ borderTop: "none", height: "3.5rem", borderRadius: "0px" }} type="password" placeholder={statepassword} className="form-controll" />
                                            <input ref={phoneref} style={{ borderTop: "none", height: "3.5rem", borderRadius: "0px" }} type="number" placeholder={statephone} className="form-controll" />
                                        </div>
                                        <Button style={{ width: "100%", padding: "20px 20px", margin: "30px auto" }}>SIGN UP</Button>
                                        {/* Register buttons */}
                                        <div className="text-center">
                                            <p>  <i>Login?</i>  <Link to="/login">Click</Link></p>
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

export default RegisterPage;