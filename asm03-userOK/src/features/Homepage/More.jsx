import React from 'react';
import Button from '../../UI/Button/Button';
const More = () => {
    return (
        <>
            <div style={{ backgroundColor: "#f8f8f8", padding: "4rem 2rem" }} className='row '>
                <div className='col-4 text-center'>
                    <h5>FREE SHIPPING</h5>
                    <p>Free shipping worlwide</p>
                </div>
                <div className='col-4 text-center'>
                    <h5>24 X 7 SERVICE</h5>
                    <p>Free shipping worlwide</p>
                </div>
                <div className='col-4 text-center'>
                    <h5>FESTIVAL OFFER</h5>
                    <p>Free shipping worlwide</p>
                </div>
            </div>
            <div className="formsub">
                <p className="pt-2">
                    <h4><i>LET'S BE FRIENDS!</i> </h4>
                    <p style={{ fontWeight: "300" }}> <i>Nisi nisi tempor consequat laboris nisi</i> </p>
                </p>
                <div style={{ display: "flex", height: "3rem" }} >
                    <input type="email" placeholder='Enter your email address' className="form-control" />
                    <Button >Subcribe</Button>
                </div>

            </div>
        </>
    )
}

export default More;