import React, { useState } from 'react';
import { useParams } from "react-router-dom"
import Button from '../../UI/Button/Button';
import ImgDetail from '../../UI/ImgDetail/ImgDetail';
import StateCart from '../../store/StateCart';
import { useDispatch, useSelector } from 'react-redux';
import { convert } from "../../utils/convert"
import { url_be } from "../../utils/linkconstant"
import { UseUrl } from '../../hook/UseUrl';
import Spinner from '../../UI/Spinner/Spinner';
const DetailProduct = () => {
    // State tăng giảm số lượng sp
    const [statenumber, setstatenumber] = useState(1)

    const [statedetail, setstatedetail] = useState()
    // Khai báo params
    const params = useParams().id;
    // Khai báo dispatch
    const dispatch = useDispatch()
    // Lấy function action khai báo từ StateCart
    const action = StateCart.actions;
    // Lấy ra người dùng hiện tại 
    let userlogin = useSelector((state) => state.userlogin)
    ////////////////////////////////////////////////////
    const path = `getproduct/${params}`
    const { isLoading, data, isError } = UseUrl(path, params)
    if (!statedetail && data) {
        setstatedetail(data)
    }
    /////////////////////////////////////////
    // Giảm sản phẩm
    const prevClick = () => {
        if (statedetail.productitem.count > 0) {
            if (statenumber == 1) {
                return
            }
            setstatenumber((prev) => prev - 1)
        }
    }
    // Tăng sản phẩm
    const nextClick = () => {
        if (statedetail.productitem.count > 0) {
            setstatenumber((prev) => prev + 1)
        }
    }
    // Thêm sản phẩm vào giỏ
    const addtocart = () => {
        // Nếu add giỏ hàng khi chưa đăng nhập, đưa ra thông báo và return
        if (!userlogin) {
            alert("Vui lòng đăng nhập")
            return
        }
        // Khai báo 1 item gồm item, count, nameuser
        let item = {
            item: statedetail.productitem,
            count: statenumber,
            iduser: userlogin.iduser
        }
        if (statedetail.productitem?.count >= statenumber) {
            // Thực hiện action và set state vào store
            dispatch(action.addcart(item))
        } else {
            alert("Ko đặt quá hàng tồn")
        }
    }
    // Chuyển đổi dạng số => chuỗi price
    const a = statedetail?.productitem?.price;
    let price = convert(a)
    // Định dạng img
    let pathimg = statedetail?.productitem?.img1;
    if (statedetail?.productitem?.img1?.includes("public")) {
        pathimg = `${url_be}/${statedetail?.productitem?.img1}`
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
                statedetail &&
                <>
                    <div className='popup'>
                        <div>
                            <img src={pathimg} alt="" />
                        </div>
                        <div>
                            <h4>{statedetail.productitem?.name}</h4>
                            <p>{price} VND</p>
                            <p>{statedetail.productitem?.short_desc}</p>
                            <p> <h6 style={{ display: "inline" }}>CATEGORY:</h6> <i>{statedetail.productitem?.category}</i> </p>
                            <p> <h6 style={{ display: "inline" }}>HÀNG TỒN:</h6> <i>{statedetail.productitem?.count}</i> </p>
                            <div className='oder'>
                                <div className='cartoder'>
                                    <input placeholder='QUANTITY' type="text" style={{ height: "2rem", boxSizing: "border-box" }} />
                                    <div className='floatbtn'>
                                        <button onClick={prevClick}>&#10094;</button>
                                        <label style={{ margin: "5px" }}>{statenumber}</label>
                                        <button onClick={nextClick}>&#10095;</button>
                                    </div>
                                </div>
                                {
                                    statedetail.productitem.count == 0 ? <Button style={{ height: "2rem", color: "white", padding: "5px 5px", backgroundColor: "red", fontWeight: "700" }} >Hết hàng</Button>
                                        :
                                        <Button className="test" onClick={addtocart} style={{ height: "2rem", padding: "5px 5px" }}> Add to Cart</Button>
                                }
                            </div>

                        </div>
                    </div>
                    <div className='description'>
                        <Button style={{ margin: "2rem auto" }}>DESCRIPTION</Button>
                        <h4>PRODUCT DESCRIPTION</h4>
                        <br />
                        <div style={{ whiteSpace: "pre", fontWeight: "300" }}>{statedetail.productitem?.long_desc}</div>
                        <h4 style={{ margin: "2rem auto" }}>RELATED PRODUCTS</h4>
                        <div className='related'>
                            {
                                statedetail.listproductcategory.map((item, i) => <ImgDetail key={i} data={item} />)
                            }
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default DetailProduct;