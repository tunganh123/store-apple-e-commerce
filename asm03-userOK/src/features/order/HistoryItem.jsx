import React from 'react';
import { convert } from '../../utils/convert';

const HistoryItem = ({ item, clickhandler, startIndex }) => {
    const clickview = () => {
        clickhandler(item)
    }
    let total = convert(item.totalprice)
    return (
        <>
            <td>{startIndex}</td>
            <td>{item._id}</td>
            <td>{item.useridorder}</td>
            <td>{item.infoorder.fullname}</td>
            <td>{item.infoorder.phone}</td>
            <td>{item.infoorder.address}</td>
            <td>{total} VND</td>
            <td>Wating for progressing</td>
            <td>{item.status}</td>
            <td><button style={{ border: "1px solid black", padding: "0.5rem 1rem", backgroundColor: "white" }} onClick={clickview}>View &#8594;</button></td>
        </>
    )
}

export default HistoryItem;