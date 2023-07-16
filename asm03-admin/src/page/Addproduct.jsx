
import React, { useState, useRef } from 'react';
import { getCookie } from "react-use-cookie"
import { TitleTable } from '../UI/TitleTable';
import { RowForm } from '../UI/RowForm';
import { Input, TextArea } from '../UI/Input';
import { Button } from '../UI/Button';
import { AddProductMutate } from '../Services/services';
import SpinnerMini from '../UI/SpinnerMini';
const Addproduct = () => {
    const tkadmin = getCookie("tokenadmin")
    const [statename, setstatename] = useState()
    const [statecategory, setstatecategory] = useState("iphone")
    const [stateshortdesc, setshortdesc] = useState()
    const [statelongdesc, setlongdesc] = useState()
    const [stateprice, setprice] = useState()
    const [stateinventory, setinventory] = useState()
    const { mutate, isLoading } = AddProductMutate()
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
        mutate({ token: tkadmin, datapost: dataok })
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
            <TitleTable style={{ marginBottom: "2rem" }}>Add New Product</TitleTable>
            <form>
                <RowForm title="Name">
                    <Input onChange={(e) => setstatename(e.target.value)} placeholder='Enter Product Name' type="text" />
                </RowForm>
                <RowForm title="Category">
                    <div>
                        <select value={statecategory} name="" id="" onChange={(e) => setstatecategory(e.target.value)}>
                            <option value="iphone">Iphone</option>
                            <option value="ipad">Ipad</option>
                            <option value="airpod">Airpod</option>
                            <option value="watch">Watch</option>
                        </select>
                    </div>
                </RowForm>
                <RowForm title="Short Description">
                    <TextArea onChange={(e) => setshortdesc(e.target.value)} placeholder='Enter Short Description' cols="30" rows="3" />
                </RowForm>
                <RowForm title="Long Description">
                    <TextArea onChange={(e) => setlongdesc(e.target.value)} placeholder='Enter Long Description' cols="30" rows="10" />
                </RowForm>
                <RowForm title="Price">
                    <Input type='number' onChange={(e) => setprice(e.target.value)} placeholder='Enter price' />
                </RowForm>
                <RowForm title="Inventory">
                    <Input type='number' onChange={(e) => setinventory(e.target.value)} placeholder='Enter inventory' />
                </RowForm>
                <RowForm title="Upload Image (4 images)">
                    <input ref={ref} onChange={changehandler} type="file" multiple />
                    <div className='review'>
                        {
                            images.map((item, i) =>
                                <img key={i} style={{ width: "5rem", height: "5rem", margin: "0.5em" }} src={item} alt="" />
                            )
                        }
                    </div>
                </RowForm>
                {
                    isLoading ? <SpinnerMini /> :
                        <Button onClick={clickhandler} sty={{ color: "white", backgroundColor: "#4e73df", border: "none", padding: "0.5rem 1rem" }}>Submit</Button>
                }
            </form>
        </>
    )
}

export default Addproduct;