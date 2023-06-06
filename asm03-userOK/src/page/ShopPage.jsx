import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoaderData } from "react-router-dom"
import "./pagecss/Shoppage.css"
import ImgDetail from './ImgDetail/ImgDetail';
const ShopPage = () => {
    // Lấy data từ API
    const data = useLoaderData()
    // State lưu danh sách sp
    const [stateListItem, setstateListItem] = useState(data)
    // Tạo hàm filter
    const clickfilter = (a) => {
        const datafilter = data.filter((dat) => dat.category == a)
        setstateListItem(datafilter)
    }
    // Click vào all
    const allClick = () => {
        setstateListItem(data)
    }
    // Click vào Iphone
    const iphoneClick = () => {
        clickfilter("iphone")
    }
    // Click vào Ipad
    const ipadClick = () => {
        clickfilter("ipad")
    }
    // Click vào macbook
    const macbookClick = () => {
        clickfilter("macbook")
    }
    // Click vào airpod
    const airpodClick = () => {
        clickfilter("airpod")
    }
    // Click vào watch
    const watchClick = () => {
        clickfilter("watch")
    }
    // Click vào mouse
    const mouseClick = () => {
        clickfilter("mouse")
    }
    // Click vào keyboard
    const keyboardClick = () => {
        clickfilter("keyboard")
    }
    // Click vào other
    const otherClick = () => {
        clickfilter("other")
    }

    const clickcheck = () => { }
    return (
        <>
            <div className='shoppage'>
                <div style={{ backgroundColor: "#f8f8f8", padding: "4rem 2rem", gridColumn: "1/-1", }} >
                    SHOP
                </div>
                <ul className="nav flex-column navbarshop">
                    <li className="nav-item "> <h3> CATEGORIES</h3> </li>
                    <li className="nav-item title" style={{ backgroundColor: "black", color: "white" }}>APPLE</li>
                    <li className="nav-item">
                        <Link className='checkok' onClick={allClick} to="">All</Link>
                    </li>
                    <li className="nav-item title">IPHONE & MAC </li>
                    <li className="nav-item">
                        <Link className='checkok' onClick={iphoneClick} to="">Iphone</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='checkok' onClick={ipadClick} to="">Ipad</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='checkok' onClick={macbookClick} to="">Macbook</Link>
                    </li>
                    <li className="nav-item title">WIRELESS</li>
                    <li className="nav-item">
                        <Link className='checkok' onClick={airpodClick} to="">Airpod</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='checkok' onClick={watchClick} to="">Watch</Link>
                    </li>
                    <li className="nav-item title">OTHER</li>
                    <li className="nav-item">
                        <Link className='checkok' onClick={mouseClick} to="">Mouse</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='checkok' onClick={keyboardClick} to="">Keyboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='checkok' onClick={otherClick} to="">Other</Link>
                    </li>
                </ul>
                <div className='content'>
                    <div className='contentnav'>
                        <input type="text" className='form-control' placeholder='Enter search here' style={{ width: "30%" }} />
                        <select name="" id="" >
                            <option value="">Default sorting</option>
                        </select>
                    </div>
                    <div className='contentitem'>
                        {
                            stateListItem.map((dat) => <Link to={`/detail/${dat._id}`}><ImgDetail key={dat._id.$oid} data={dat} click={clickcheck} /></Link>)
                        }
                    </div>
                    <div className='floatitem'>
                        <div>
                            <button>&#60;&#60;</button>
                            <label htmlFor="" style={{ margin: "auto 1rem" }}>?</label>
                            <button>&#62;&#62;</button>
                        </div>
                        <p>Showing 1-9 of results</p>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ShopPage;
