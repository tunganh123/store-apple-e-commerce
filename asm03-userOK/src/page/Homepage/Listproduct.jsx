import React from 'react';
import { useLoaderData } from "react-router-dom"
import ImgDetail from '../ImgDetail/ImgDetail';
import { useSelector, useDispatch } from "react-redux";
import Statedetail from '../../store/Statedetail';
import Popup from '../../Popup/Popup';
const Listproduct = () => {
    const data = useLoaderData()
    const opa = document.querySelector(".opa")
    const dispatch = useDispatch()
    const action = Statedetail.actions;
    const detail = useSelector((state) => state.detail)
    //callback
    const clickHandler = (data) => {
        dispatch(action.show_popup(data))
        opa.classList.remove("hidden")

    }
    return (
        <>
            <div>
                <h4 style={{ fontWeight: "300" }}>MADE THE HARD WAY</h4>
                <h3>TOP TRENDING PRODUCTS</h3>
            </div>
            <div className='imglist'>
                {
                    data.map((dat, i) => <ImgDetail click={clickHandler} key={i} data={dat} />)
                }
            </div>
            {
                detail.check &&
                <Popup />
            }

        </>
    )
}

export default Listproduct;