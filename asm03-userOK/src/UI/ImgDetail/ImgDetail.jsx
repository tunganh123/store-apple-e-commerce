import React from 'react';
import "./ImgDetail.css"
import { convert } from '../../utils/convert';
import { url_be } from '../../utils/linkconstant';
const ImgDetail = ({ data, click }) => {
    // Chuyển đổi dạng số => chuỗi price
    let price = convert(data.price)
    const clickHandler = () => {
        click(data)
    }
    let pathimg = data.img1;
    if (data?.img1?.includes("public")) {
        pathimg = `${url_be}/${data.img1}`
    }
    return (
        <>
            <div className='imgdetail'>
                <img onClick={clickHandler} src={pathimg} alt="" />
                <p style={{ fontWeight: "700" }}>{data.name}</p>
                <p>{price} VND</p>
            </div>


        </>
    )
}

export default ImgDetail;