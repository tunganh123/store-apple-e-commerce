import React from 'react';
import { useRef } from 'react';
import { LoginMutate } from '../Services/services';
import SpinnerMini from '../UI/SpinnerMini';
const Login = () => {
    const refemail = useRef()
    const refpassword = useRef()
    const { mutate, isLoading } = LoginMutate()
    const clicklogin = () => {
        let data = {
            email: refemail.current.value,
            password: refpassword.current.value
        }
        mutate(data)
    }
    const handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            clicklogin();
        }
    };
    return (
        <>
            <div className="divNavbar head" style={{ padding: "1rem", textAlign: "center" }}>
                <h2 style={{ margin: "auto" }}>Admin </h2>
            </div>
            <div style={{ width: "25rem", textAlign: "center", margin: "5rem auto" }}>
                <input onKeyUp={handleKeyUp} ref={refemail} placeholder='input email please' style={{ marginBottom: "1rem" }} type="text" className='form-control' />
                <input onKeyUp={handleKeyUp} ref={refpassword} placeholder='input password please' style={{ marginBottom: "1rem" }} type="password" className='form-control' />
                {
                    isLoading ? <SpinnerMini /> :
                        <button onClick={clicklogin} style={{ fontWeight: "700", margin: "0", backgroundColor: "rgb(91, 177, 235)", color: "white", width: "100%" }} className='btn'>Login</button>
                }
            </div>
        </>
    )
}

export default Login;