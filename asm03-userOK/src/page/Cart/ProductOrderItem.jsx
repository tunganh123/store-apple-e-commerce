import React from 'react';
import { convert } from '../CheckoutPage';
import { url_be } from '../..';
const ProductOrderItem = ({ item, clickhandler }) => {
    let pathimg = item.product?.img1;
    if (item.product?.img1?.includes("public")) {
        pathimg = `${url_be}/${item.product?.img1}`
    }
    return (
        <>
            <td>{item.product._id}</td>
            <td><img style={{ width: "10rem", height: "10rem" }} src={pathimg} alt="" /></td>
            <td>{item.product.name}</td>
            <td>{convert(item.product.price)} VND</td>
            <td>{item.count} </td>
        </>
    )
}

export default ProductOrderItem;