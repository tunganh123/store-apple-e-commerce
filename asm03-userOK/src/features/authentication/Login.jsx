import Button from '../../UI/Button/Button';
import { Input } from "../../UI/Input/Input"
import React from 'react';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { FormAuth } from '../../UI/Formauth/FormAuth';
import { LoginMutate } from '../../services/services';
import SpinnerMini from "../../UI/Spinner/SpinnerMini"
const Login = () => {
    // State để cập nhật lỗi khi nhập k đúng qđ
    const [stateemail, setemail] = useState("email")
    const [statepassword, setpassword] = useState("Password")

    // Ref gắn 2 thẻ input
    const emailref = useRef()
    const passwordref = useRef()
    const { mutate, isLoading } = LoginMutate()
    // Sự kiện đăng nhập
    const submitHandler = async (e) => {
        e.preventDefault()
        //Validate du lieu
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
        mutate(datalogin)
    }
    return (
        <>
            <FormAuth submitHandler={submitHandler} title='Sign In'>
                <div className="form-outline mb-4">
                    <Input ref={emailref} type="email" placeholder={stateemail} />
                    <Input ref={passwordref} stylebot={{ borderTop: "none" }} type="password" placeholder={statepassword} />
                </div>
                {
                    isLoading ? <div style={{ display: "flex", justifyContent: "center" }}><SpinnerMini /> </div> :
                        <Button style={{ width: "100%", padding: "20px 20px", margin: "30px auto" }}>SIGN IN</Button>
                }
                {/* Register buttons */}
                <div className="text-center">
                    <p><i>Create an account?</i>  <Link to="/register">Sign up</Link></p>
                </div>
            </FormAuth>
        </>
    )
}

export default Login;