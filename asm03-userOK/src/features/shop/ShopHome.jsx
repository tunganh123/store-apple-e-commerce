import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UseUrl } from '../../hook/UseUrl';
import ImgDetail from '../../UI/ImgDetail/ImgDetail';
import Spinner from '../../UI/Spinner/Spinner';
import { GetProductService } from '../../services/services';
import Pagination from "../../UI/Pagination/Pagination"
import { useSearchParams } from 'react-router-dom';
const ShopHome = () => {
    const { isLoading, data, isError } = GetProductService()
    // State lưu danh sách sp
    const [stateListItem, setstateListItem] = useState()
    // Tạo hàm filter
    const clickfilter = (a) => {
        const datafilter = data.filter((dat) => dat.category == a)
        setstateListItem(datafilter)
    }
    useEffect(() => {
        setstateListItem(data)
    }, [data])
    ///////////pagination
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));
    let startIndex = (currentPage - 1) * Number(process.env.REACT_APP_PAGE_SIZE);
    const endIndex = startIndex + Number(process.env.REACT_APP_PAGE_SIZE) - 1;
    const currentData = stateListItem?.slice(startIndex, endIndex + 1);
    const clickcheck = () => { }
    return (
        <>
            <div style={{ backgroundColor: "#f8f8f8", padding: "4rem 2rem", gridColumn: "1/-1", }} >
                SHOP
            </div>
            <ul className="nav flex-column navbarshop">
                <li className="nav-item "> <h3> CATEGORIES</h3> </li>
                <li className="nav-item title" style={{ backgroundColor: "black", color: "white" }}>APPLE</li>
                <li className="nav-item">
                    <NavLink onClick={() => setstateListItem(data)} to="">All</NavLink>
                </li>
                <li className="nav-item title">IPHONE & MAC </li>
                <li className="nav-item">
                    <NavLink onClick={() => clickfilter("iphone")} to="">Iphone</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink onClick={() => clickfilter("ipad")} to="">Ipad</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink onClick={() => clickfilter("macbook")} to="">Macbook</NavLink>
                </li>
                <li className="nav-item title">WIRELESS</li>
                <li className="nav-item">
                    <NavLink onClick={() => clickfilter("airpod")} to="">Airpod</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink onClick={() => clickfilter("watch")} to="">Watch</NavLink>
                </li>
                <li className="nav-item title">OTHER</li>
                <li className="nav-item">
                    <NavLink onClick={() => clickfilter("mouse")} to="">Mouse</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink onClick={() => clickfilter("keyboard")} to="">Keyboard</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink onClick={() => clickfilter("other")} to="">Other</NavLink>
                </li>
            </ul>
            {
                isLoading && <Spinner />
            }
            {
                isError && !isLoading && <div>Some thing wrong!!!</div>
            }
            {
                stateListItem &&
                <div className='content'>
                    <div className='contentnav'>
                        <input type="text" className='form-control' placeholder='Enter search here' style={{ width: "30%" }} />
                        <select name="" id="" >
                            <option value="">Default sorting</option>
                        </select>
                    </div>
                    <div className='contentitem'>
                        {
                            currentData.map((dat) => <NavLink to={`/detail/${dat._id}`}><ImgDetail key={dat._id.$oid} data={dat} click={clickcheck} /></NavLink>)
                        }
                    </div>
                    <div >
                        <Pagination count={stateListItem?.length} pagesize={Number(process.env.REACT_APP_PAGE_SIZE)} />
                    </div>
                </div>
            }

        </>
    )
}

export default ShopHome;
