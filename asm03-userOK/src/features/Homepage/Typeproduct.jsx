import React from 'react';
import { Link, } from "react-router-dom"
const Typeproduct = () => {
    return (
        <>
            <div>
                <h4 style={{ fontWeight: "300" }}>CAREFULLY CREATED COLLECTIONS</h4>
                <h3>BROWSE OUR CATEGORIES</h3>
            </div>
            <div className='imgtype'>
                <div className='imgrow1'>

                    <Link to="/shop"> <img src="../img/product_1.png" alt="" /></Link>
                    <Link to="/shop"><img src="../img/product_2.png" alt="" /></Link>
                </div>
                <div className='imgrow2'>
                    <Link to="/shop"><img src="../img/product_3.png" alt="" /></Link>
                    <Link to="/shop"><img src="../img/product_4.png" alt="" /></Link>
                    <Link to="/shop"><img src="../img/product_5.png" alt="" /></Link>
                </div>
            </div>
        </>
    )
}

export default Typeproduct;