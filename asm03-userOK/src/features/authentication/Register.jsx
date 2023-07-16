import { FormAuth } from '../../UI/Formauth/FormAuth';
import Button from '../../UI/Button/Button';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../UI/Input/Input';
import { RegisterMutate } from '../../services/services';
import SpinnerMini from '../../UI/Spinner/SpinnerMini';
const Register = () => {
    const [stateform, setform] = useState({
        fullname: "",
        email: "",
        password: "",
        phone: "",
    })
    const { mutate, isLoading } = RegisterMutate()
    const submitHandler = (e) => {
        e.preventDefault()
        let check = true;
        // Check dữ liệu username
        if (stateform.fullname.trim() == "") {
            alert("Vui lòng nhập full name")
            check = false
        }
        // Check dữ liệu email
        if (stateform.email.trim() == "") {
            alert("Vui lòng nhập email")
            check = false
        }
        // Check dữ liệu pass
        if (stateform.password.trim() == "") {
            alert("Vui lòng nhập password")
            check = false
        }
        // Check dữ liệu Phone
        if (stateform.phone.trim() == "") {
            alert("Vui lòng nhập phone")
            check = false
        }
        // Check pass< 8 ký tự
        if (check && stateform.password.trim().length <= 8) {
            alert("Password phải lớn hơn 8 ký tự")
            check = false
        }
        if (check) {
            mutate(stateform)
        }
    }
    // update state input
    const changestate = (e) => {
        setform((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    return (
        <FormAuth submitHandler={submitHandler}>
            <div className="form-outline mb-4">
                <Input value={stateform.fullname} onChange={changestate} type="text" placeholder="Full name" name="fullname" />
                <Input value={stateform.email} onChange={changestate} stylebot={{ borderTop: "none" }} type="email" placeholder="Email" name="email" />
                <Input value={stateform.password} onChange={changestate} stylebot={{ borderTop: "none" }} type="password" placeholder="password" name="password" />
                <Input value={stateform.phone} onChange={changestate} stylebot={{ borderTop: "none" }} type="number" placeholder="phone" name="phone" />
            </div>
            {
                isLoading ? <div style={{ display: "flex", justifyContent: "center" }}><SpinnerMini /> </div> :
                    <Button style={{ width: "100%", padding: "20px 20px", margin: "30px auto" }}>SIGN UP</Button>
            }
            <div className="text-center">
                <p>  <i>Login?</i>  <Link to="/login">Click</Link></p>
            </div>
        </FormAuth>
    )
}

export default Register;