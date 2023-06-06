import React from 'react';
import { useNavigate } from 'react-router-dom';
import { convert } from '../../utils/convert';

const ProductItem = ({ item, clickdelete }) => {
    const navi = useNavigate()
    let itemimg = item.img1;
    if (item.img1.includes("public")) {
        itemimg = `${process.env.REACT_APP_URL_FETCH}/${item.img1}`
    }
    const deletehandler = () => {
        clickdelete(item)
    }
    return (
        <tr  >
            <td >{item._id}</td>
            <td >{item.name}</td>
            <td >{convert(item.price)} VND</td>
            <td >{item.count}</td>
            <td ><img src={itemimg} style={{ width: "5rem", height: "5rem" }} alt="" /></td>
            <td >{item.category}</td>
            <td >
                <div style={{ display: "flex" }}>
                    <button onClick={() => navi(`/editproduct/${item._id}`)} style={{ padding: "0.3rem 0.7rem ", margin: "auto", color: "white", border: "1px solid  #00973f", backgroundColor: "#00973f" }}>Update</button>
                    <button onClick={deletehandler} style={{ padding: "0.3rem 0.7rem ", margin: "auto", color: "white", border: "1px solid  red", backgroundColor: "red" }}>Delete</button>
                </div>

            </td>
        </tr>
    )
}

export default ProductItem;