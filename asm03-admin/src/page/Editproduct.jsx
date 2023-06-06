import Sidebar from '../componend/UI/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Fetchdata } from '../utils/fetchdata';
import Navi from '../componend/UI/Navi';
import { getCookie } from "react-use-cookie"
const Editproduct = () => {
    const [statename, setstatename] = useState()
    const [statecategory, setstatecategory] = useState()
    const [stateshortdesc, setshortdesc] = useState()
    const [statelongdesc, setlongdesc] = useState()
    const [stateprice, setprice] = useState()
    const [stateinventory, setinventory] = useState()
    const tkadmin = getCookie("tokenadmin")
    const navi = useNavigate()
    // images review
    const [images, setImages] = useState([]);
    const ref = useRef()
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
    const idproduct = useParams().idproduct;
    const clickhandlerupdate = (e) => {
        e.preventDefault()
        let data = {
            category: statecategory,
            name: statename,
            price: stateprice,
            long_desc: statelongdesc,
            short_desc: stateshortdesc,
            count: stateinventory
        }
        const fetchdata = async () => {
            const result = await Fetchdata(data, `updatedetail/${idproduct}`, tkadmin)
            if (result.err) {
                alert(result.err)
                return
            }
        }
        fetchdata()
        navi("/listproduct")
    }
    useEffect(() => {
        const fetchdetail = async () => {
            let arr = []
            const result = await Fetchdata({ idproduct: idproduct }, "detailproduct", tkadmin)
            if (result.err) {
                alert(result.err)
                navi("/login")
                return
            }
            // Lưu danh sách địa chỉ img vào mảng arr
            for (let index = 1; index < 5; index++) {
                let item = result[`img${index}`];
                if (result[`img${index}`].includes("public")) {
                    item = `${process.env.REACT_APP_URL_FETCH}/${result[`img${index}`]}`
                }
                arr.push(item)
            }
            setImages(arr)
            setstatename(result.name)
            setstatecategory(result.category)
            setshortdesc(result.short_desc)
            setlongdesc(result.long_desc)
            setprice(result.price)
            setinventory(result.count)
        }
        fetchdetail()
    }, [])
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
                            <h2 style={{ marginBottom: "2rem" }}>Edit Product</h2>
                            <form>
                                {/* 2 column grid layout with text inputs for the first and last names */}
                                <div style={{ marginBottom: "1rem" }}>
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example1">Product Name</label>
                                        <input onChange={(e) => setstatename(e.target.value)} value={statename} placeholder='Enter Product Name' type="text" id="form6Example1" className="form-control" />
                                    </div>
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example2">Category</label>
                                        {/* <input onChange={(e) => setstatecategory(e.target.value)} placeholder='Enter Category' type="text" id="form6Example2" className="form-control" /> */}
                                        <div>
                                            <select value={statecategory} name="" id="" onChange={(e) => setstatecategory(e.target.value)}>
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
                                            <textarea value={stateshortdesc} onChange={(e) => setshortdesc(e.target.value)} placeholder='Enter Short Description' className="form-control" name="" id="" cols="30" rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example2">Long Description</label>
                                        <div>
                                            <textarea value={statelongdesc} onChange={(e) => setlongdesc(e.target.value)} placeholder='Enter Long Description' className="form-control" name="" id="" cols="30" rows="10"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example2">Price</label>
                                        <div>
                                            <input value={stateprice} type='number' onChange={(e) => setprice(e.target.value)} placeholder='Enter price' className="form-control" name="" ></input>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example2">Inventory</label>
                                        <div>
                                            <input value={stateinventory} type='number' onChange={(e) => setinventory(e.target.value)} placeholder='Enter inventory' className="form-control" name="" ></input>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <div className="form-outline">
                                        <div>
                                            <label className="form-label" htmlFor="form6Example2">Upload Image (5 images)</label>
                                        </div>
                                        <input disabled ref={ref} onChange={changehandler} type="file" multiple />
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
                                <button onClick={clickhandlerupdate} style={{ color: "white", backgroundColor: "#4e73df", border: "none", padding: "0.5rem 1rem" }}>Update</button>
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

export default Editproduct;