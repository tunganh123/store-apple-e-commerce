import React from 'react';
import ImgDetail from '../../UI/ImgDetail/ImgDetail';
import { useSelector, useDispatch } from "react-redux";
import Statedetail from '../../store/Statedetail';
import Popup from '../../UI/Popup/Popup';
import Spinner from '../../UI/Spinner/Spinner';
import { GetProductService } from '../../services/services';
const Listproduct = () => {
    const { isLoading, data, isError } = GetProductService()
    const opa = document.querySelector(".opa")
    const dispatch = useDispatch()
    const action = Statedetail.actions;
    const detail = useSelector((state) => state.detail)
    //callback
    const clickHandler = (dat) => {
        dispatch(action.show_popup(dat))
        opa.classList.remove("hidden")
    }
    return (
        <>
            {
                isLoading && <Spinner />
            }
            {
                isError && !isLoading && <div>Some thing wrong!!!</div>
            }
            {
                data &&
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
                </>
            }
            {
                detail.check &&
                <Popup />
            }

        </>
    )
}

export default Listproduct;