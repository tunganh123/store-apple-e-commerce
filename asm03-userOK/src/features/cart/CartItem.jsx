import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convert } from '../../utils/convert';
import { url_be } from '../../utils/linkconstant';
const CartItem = ({ cart, click, prev, next }) => {
    // Click delete
    const clickdelete = () => {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            click(cart)
        } else return
    }
    // Click giảm sp
    const clickprev = () => {
        if (cart.count == 1) {
            return
        }
        prev(cart)
    }
    // Click tăng sp
    const clicknext = () => {
        next(cart)
    }
    let pathimg = cart.item?.img1;
    if (cart.item?.img1?.includes("public")) {
        pathimg = `${url_be}/${cart.item?.img1}`
    }
    return (
        <tr>
            <td><img style={{ width: "100%", height: "auto" }} src={pathimg} alt="" /></td>
            <td>{cart.item.name}</td>
            <td>{convert(cart.item.price)} VND</td>
            <td>
                <div className=''>
                    <button onClick={clickprev} style={{ border: "none", backgroundColor: "white" }}>&#10094;</button>
                    <label htmlFor="" style={{ margin: "5px" }}>{cart.count}</label>
                    <button onClick={clicknext} style={{ border: "none", backgroundColor: "white" }}>&#10095;</button>
                </div>
            </td>
            <td>{convert(cart.item.price * cart.count)} VND</td>
            <td><button style={{ border: "none", backgroundColor: "white" }} onClick={clickdelete}><FontAwesomeIcon style={{ fontSize: "2rem" }} icon="fa-solid fa-trash-can" /></button></td>
        </tr>
    )
}

export default CartItem;