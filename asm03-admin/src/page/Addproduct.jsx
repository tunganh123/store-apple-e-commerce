import Sidebar from '../componend/UI/Sidebar';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import Navi from '../componend/UI/Navi';
import { getCookie } from "react-use-cookie"
const Addproduct = () => {
    const tkadmin = getCookie("tokenadmin")
    const navi = useNavigate()
    const [statename, setstatename] = useState()
    const [statecategory, setstatecategory] = useState("iphone")
    const [stateshortdesc, setshortdesc] = useState()
    const [statelongdesc, setlongdesc] = useState()
    const [stateprice, setprice] = useState()
    const [stateinventory, setinventory] = useState()

    // images review
    const [images, setImages] = useState([]);
    const ref = useRef()
    const clickhandler = (e) => {
        e.preventDefault()
        //validate
        if (!statename || statename.trim() == 0) {
            alert("Vui lòng nhập tên sản phẩm")
            return
        }
        if (!stateshortdesc || stateshortdesc.trim() == 0) {
            alert("Vui lòng nhập shortdesc")
            return
        }
        if (!statelongdesc || statelongdesc.trim() == 0) {
            alert("Vui lòng nhập longdesc")
            return
        }
        if (!stateprice || stateprice.trim() == 0) {
            alert("Vui lòng nhập price")
            return
        }
        if (ref.current.files.length != 4) {
            alert("Vui lòng tải đủ 4 ảnh")
            return
        }
        let dataok = new FormData()
        for (const single_file of ref.current.files) {
            dataok.append('img', single_file)
        }
        dataok.append("name", statename)
        dataok.append("category", statecategory)
        dataok.append("shortdesc", stateshortdesc)
        dataok.append("longdesc", statelongdesc)
        dataok.append("price", stateprice)
        dataok.append("count", stateinventory)
        const fetchdata = async () => {
            try {
                const result = await fetch(`${process.env.REACT_APP_URL_FETCH}/addproduct`, {
                    method: "POST",
                    body: dataok,
                    withCredentials: true,
                    credentials: "include",
                    headers: {
                        Authorization: "Bearer " + tkadmin,
                    },
                })
                const a = await result.json()
                console.log(a)
                if (a.err) {
                    alert(a.err)
                    // navi("/login")
                    return
                } else {
                    navi("/listproduct")
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata()
        // 
    }
    const changehandler = (e) => {
        let images = []
        let imageFiles = [];

        for (const item of e.target.files) {
            imageFiles.push(item)
        }
        imageFiles.forEach((file) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                images.push(fileReader.result)
                if (images.length === imageFiles.length) {
                    setImages(images);
                }
            }
            fileReader.readAsDataURL(file);
        })
    }
    return (
        <>
            {/* Page Wrapper */}
            <div id="wrapper">
                {/* Sidebar */}
                <Sidebar />
                <div style={{ padding: "2rem" }} id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        {/* Topbar */}
                        <Navi />
                        <div className="container-fluid">
                            <h2 style={{ marginBottom: "2rem" }}>Add New Product</h2>
                            <form>
                                {/* 2 column grid layout with text inputs for the first and last names */}
                                <div style={{ marginBottom: "1rem" }}>
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example1">Product Name</label>
                                        <input onChange={(e) => setstatename(e.target.value)} placeholder='Enter Product Name' type="text" id="form6Example1" className="form-control" />
                                    </div>
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example2">Category</label>
                                        <div>
                                            <select name="" id="" value={statecategory} onChange={(e) =>
                                                setstatecategory(e.target.value)}>
                                                <option value="iphone">Iphone</option>
                                                <option value="ipad">Ipad</option>
                                                <option value="airpod">Airpod</option>
                                                <option value="watch">Watch</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>
                                {/* 2 column grid layout with text inputs for the first and last names */}
                                <div style={{ marginBottom: "1rem" }}>
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example1">Short Description</label>
                                        <div>
                                            <textarea onChange={(e) => setshortdesc(e.target.value)} placeholder='Enter Short Description' className="form-control" name="" id="" cols="30" rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example2">Long Description</label>
                                        <div>
                                            <textarea onChange={(e) => setlongdesc(e.target.value)} placeholder='Enter Long Description' className="form-control" name="" id="" cols="30" rows="10"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example2">Price</label>
                                        <div>
                                            <input type='number' onChange={(e) => setprice(e.target.value)} placeholder='Enter price' className="form-control" name="" ></input>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example2">Inventory</label>
                                        <div>
                                            <input type='number' onChange={(e) => setinventory(e.target.value)} placeholder='Enter price' className="form-control" name="" ></input>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <div className="form-outline">
                                        <div>
                                            <label className="form-label" htmlFor="form6Example2">Upload Image (4 images)</label>
                                        </div>
                                        <input ref={ref} onChange={changehandler} type="file" multiple />
                                    </div>
                                    <div className='review'>
                                        {/* <img src={statereview} style={{ width: "10rem", height: "10rem" }} alt="" /> */}
                                        {
                                            images.map((item, i) =>
                                                <img key={i} style={{ width: "5rem", height: "5rem", margin: "0.5em" }} src={item} alt="" />
                                            )
                                        }
                                    </div>
                                </div>
                                <button onClick={clickhandler} style={{ color: "white", backgroundColor: "#4e73df", border: "none", padding: "0.5rem 1rem" }}>Submit</button>
                                {/* Submit button */}

                            </form>
                        </div>
                        {/* /.container-fluid */}
                    </div>
                    {/* End of Main Content */}
                    {/* Footer */}
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright © Your Website 2023</span>
                            </div>
                        </div>
                    </footer>
                    {/* End of Footer */}
                </div>
                {/* End of Content Wrapper */}
            </div>
        </>
    )
}

export default Addproduct;