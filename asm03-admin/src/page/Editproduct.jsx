
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { getCookie } from "react-use-cookie"
import { RowForm } from '../UI/RowForm';
import { Input, TextArea } from '../UI/Input';
import SpinnerMini from '../UI/SpinnerMini';
import { Button } from '../UI/Button';
import { TitleTable } from '../UI/TitleTable';
import { EditProductMutate, GetItemProductQuery } from '../Services/services';
const Editproduct = () => {
    const [statename, setstatename] = useState()
    const [statecategory, setstatecategory] = useState()
    const [stateshortdesc, setshortdesc] = useState()
    const [statelongdesc, setlongdesc] = useState()
    const [stateprice, setprice] = useState()
    const [stateinventory, setinventory] = useState()
    const tkadmin = getCookie("tokenadmin")
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
    const { mutate, load } = EditProductMutate()
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
        mutate({ token: tkadmin, idproduct: idproduct, datapost: data })
    }
    const { isError, isLoading, data } = GetItemProductQuery(tkadmin, idproduct)
    useEffect(() => {
        let arr = []
        // Lưu danh sách địa chỉ img vào mảng arr
        if (data) {
            for (let index = 1; index < 5; index++) {
                let item = data[`img${index}`];
                if (data[`img${index}`].includes("public")) {
                    item = `${process.env.REACT_APP_URL_FETCH}/${data[`img${index}`]}`
                }
                arr.push(item)
            }
            setImages(arr)
            setstatename(data.name)
            setstatecategory(data.category)
            setshortdesc(data.short_desc)
            setlongdesc(data.long_desc)
            setprice(data.price)
            setinventory(data.count)
        }
    }, [data])
    return (
        <>
            <TitleTable style={{ marginBottom: "2rem" }}>Edit Product</TitleTable>
            {
                isLoading && <SpinnerMini />
            }
            {
                isError && !isLoading && <div>Some thing wrong!!!</div>
            }
            {
                data &&
                <form>
                    <RowForm title="Name">
                        <Input onChange={(e) => setstatename(e.target.value)} value={statename} placeholder='Enter Product Name' type="text" />
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
                        <TextArea value={stateshortdesc} onChange={(e) => setshortdesc(e.target.value)} placeholder='Enter Short Description' cols="30" rows="3" />
                    </RowForm>
                    <RowForm title="Long Description">
                        <TextArea value={statelongdesc} onChange={(e) => setlongdesc(e.target.value)} placeholder='Enter Long Description' cols="30" rows="10" />
                    </RowForm>
                    <RowForm title="Price">
                        <Input value={stateprice} type='number' onChange={(e) => setprice(e.target.value)} placeholder='Enter price' />
                    </RowForm>
                    <RowForm title="Inventory">
                        <Input value={stateinventory} type='number' onChange={(e) => setinventory(e.target.value)} placeholder='Enter inventory' />
                    </RowForm>
                    <RowForm title="Upload Image (4 images)">
                        <input disabled ref={ref} onChange={changehandler} type="file" multiple />
                        <div className='review'>
                            {
                                images.map((item, i) =>
                                    <img key={i} style={{ width: "5rem", height: "5rem", margin: "0.5em" }} src={item} alt="" />
                                )
                            }
                        </div>
                    </RowForm>
                    {
                        load ? <SpinnerMini /> :
                            <Button onClick={clickhandlerupdate} sty={{ color: "white", backgroundColor: "#4e73df", border: "none", padding: "0.5rem 1rem" }}>Update</Button>
                    }
                </form>
            }
        </>
    )
}

export default Editproduct;