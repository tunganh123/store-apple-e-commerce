import React from 'react';
import Button from '../../UI/Button';
import { useNavigate, } from "react-router-dom"
const Bannerhomepage = () => {
    const navi = useNavigate()
    const clickHandler = () => {
        navi("/shop")
    }
    return (
        <>
            <img src="../img/banner1.jpg" alt="123" />
            <div className='content'>
                <p style={{ fontWeight: "300" }}>NEW INSPIRATION 2020</p>
                <h2>20% OFF ON NEW SEASON</h2>
                <Button onClick={clickHandler}>Browse collections</Button>
            </div>
        </>
    )
}

export default Bannerhomepage;