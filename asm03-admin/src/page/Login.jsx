import React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Fetchdata } from '../utils/fetchdata';
import jwt_decode from "jwt-decode"
import stateadmin from '../store/stateadmin';
import { setCookie } from 'react-use-cookie';
const Login = () => {
    const navi = useNavigate()
    const action = stateadmin.actions;
    const dispatch = useDispatch()
    const refemail = useRef()
    const refpassword = useRef()
    const clicklogin = () => {
        let data = {
            email: refemail.current.value,
            password: refpassword.current.value
        }
        const fetchlogin = async () => {
            const result = await Fetchdata(data, "adminlogin")
            if (result?.token) {
                const value = jwt_decode(result?.token)
                let dataadmin = {
                    fullname: value.fullname,
                    token: result.token
                }
                setCookie("tokenadmin", result.token)
                dispatch(action.updateadmin(dataadmin))
                navi("/dashboard")
            } else {
                alert("Thông tin đăng nhập sai")
            }
        }
        fetchlogin()
        // navi("/dashboard")
    }
    return (
        <>
            <div className="divNavbar head" style={{ padding: "1rem", textAlign: "center" }}>
                <h2 style={{ margin: "auto" }}>Admin </h2>
            </div>
            <div style={{ width: "25rem", textAlign: "center", margin: "5rem auto" }}>
                <input ref={refemail} placeholder='input email please' style={{ marginBottom: "1rem" }} type="text" className='form-control' />
                <input ref={refpassword} placeholder='input password please' style={{ marginBottom: "1rem" }} type="password" className='form-control' />
                <button onClick={clicklogin} style={{ fontWeight: "700", margin: "0", backgroundColor: "rgb(91, 177, 235)", color: "white", width: "100%" }} className='btn'>Login</button>
            </div>
        </>
    )
}

export default Login;