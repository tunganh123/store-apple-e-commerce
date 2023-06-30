import React, { useRef, useState } from 'react';
import "./Footer.css"
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import io from "socket.io-client"
import { randomString } from '../utils/fetchdata';
import { useSelector } from "react-redux"
import ScrollToBottom from "react-scroll-to-bottom"
import { url_be } from '..';
const Footer = () => {
    const ref = useRef()
    let socket = io.connect(url_be)
    // Danh sach tin nhan
    const [statemess, setstatemess] = useState([])
    // Noi dung tin nhan tu the input
    const [stateinput, setinput] = useState("")
    // show/not show enmoji
    const [statecheckemoji, setcheckemoji] = useState(false)
    // refimg
    const refimg = useRef()
    // Lấy thông tin user đang đăng nhập
    const userlive = useSelector((state) => state.userlogin)
    // enmoji
    const emojis = [
        '😀', '😃', '😄', '😁',
        '😆', '😅', '😂', '🤣',
        '😊', '😇', '🙂', '🙃',
        '😉', '😌', '😍', '😝',
        '😜', '🧐', '🤓', '😎',
        '😕', '🤑', '🥴', '😱'
    ]
    // set input emoji
    const senemoji = (e) => {
        setinput(`${stateinput}` + e)
    }
    // Khi click vào mes
    const clickmessenger = async () => {
        // Tạo phiên kết nối với roomID bằng chuỗi random
        const sessionrandom = randomString(10)
        if (ref.current.classList == "") {
            let sess = localStorage.getItem("session")
            await socket.emit("removesession", sess)
            await socket.disconnect()
            localStorage.removeItem("session")
        } else {
            let sessionitem = {
                session: sessionrandom,
                user: userlive.fullname
            }
            localStorage.setItem("session", sessionrandom)
            await socket.connect();
            await socket.emit("setsession", sessionitem)
        }
        ref.current.classList.toggle("hidden")
    }
    socket.on("reciver", (dat) => {
        if (dat.user.fullname == "supporter") {
            setstatemess((prev) => [...prev, dat])
        }
    })
    socket.on("getimg", (dat) => {
        if (dat.user.fullname == "supporter") {
            setstatemess((prev) => [...prev, dat])
        }
    })
    let sess = localStorage.getItem("session")
    // Set data để gửi tn
    let data = {
        mess: stateinput,
        sess: sess,
        user: userlive
    };
    // gui tin nhan tu nhan enter
    const keydownhandler = async (e) => {
        if (e.key == "Enter") {
            if (stateinput == "/end") {
                let sess = localStorage.getItem("session")
                await socket.emit("removesession", sess)
                await socket.disconnect()
                localStorage.removeItem("session")
                ref.current.classList.add("hidden")
            } else {
                await socket.emit("sendmess", data)
                setstatemess((prev) => [...prev, data])
                setinput("")
            }
        }
    }
    // Từ click
    const sendmess = async () => {
        await socket.emit("sendmess", data)
        setstatemess((prev) => [...prev, data])
        setinput("")
    }
    // upload img
    const changeuploadfile = (event) => {
        const file = event.target.files[0];
        let newfilename;
        if (file.type.includes("video")) {
            newfilename = "videochat" + "-" + Date.now() + "-" + file.name
        } else {
            newfilename = "imgchat" + "-" + Date.now() + "-" + file.name
        }
        const newfile = new File([file], newfilename, { type: file.type });
        const formData = new FormData();
        formData.append('imgchat', newfile);
        const fetchdata = async () => {
            try {
                const result = await fetch(`${url_be}/saveimgchat`, {
                    method: "POST",
                    body: formData,
                })
                const a = await result.json()
                if (a.err) {
                    alert(a.err)
                    return
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata()
        const reader = new FileReader();
        reader.onload = () => {
            let ses = localStorage.getItem("session")
            let data = {
                mess: reader.result,
                sess: ses,
                user: userlive
            };
            setstatemess((prev) => [...prev, data])
        }
        //     // Set data để gửi tn
        let ses = localStorage.getItem("session")
        let data = {
            mess: newfilename,
            sess: ses,
            user: userlive
        };
        socket.emit('uploadImage', data);
        reader.readAsDataURL(file);
    }
    function rendercontent(mes) {
        if (mes.mess.includes("imgchat") || mes.mess.includes("base64") || mes.mess.includes("videochat")) {
            if (mes.mess.includes("imgchat")) {
                return <img style={{ width: "10rem", height: "10rem" }} src={`${url_be}/public/img/${mes.mess}`} alt="" />
            }
            if (mes.mess.includes("videochat")) {
                return <video controls style={{ width: "10rem", height: "10rem" }} src={`${url_be}/public/img/${mes.mess}`}></video>
            }
            if (mes.mess.includes("base64") && mes.mess.includes("data:image")) {
                return <img style={{ width: "10rem", height: "10rem" }} src={mes.mess} alt="" />
            }
            if (mes.mess.includes("base64") && mes.mess.includes("data:video")) {
                return <video controls style={{ width: "10rem", height: "10rem" }} src={mes.mess}></video>
            }

        } else return <p className="small p-2 me-3 mb-1 rounded-3">{mes.user.fullname}: {mes.mess}</p>
    }
    return (
        <>
            <footer className=" text-center " id='footerr'>
                <div className="container p-4">
                    <div className="row">
                        <div className="col-4 ">
                            <h5 className="text-uppercase">CUSTOMER SERVICES</h5>
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!" className="text-white">Help & Contact Us</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Return & Refunds</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Online Stores</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Tearms & Conditions</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-4 ">
                            <h5 className="text-uppercase mb-0">COMPANY</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="#!" className="text-white">What We Do</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Available Services</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Latest Posts</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">FAQs</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <h5 className="text-uppercase mb-0">SOCIAL MEDIA</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="#!" className="text-white">Twitter</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Instagram</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Facebook</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Pinterest</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <button onClick={clickmessenger} className='messenger'><FontAwesomeIcon style={{ fontSize: "2rem" }} icon="fa-solid fa-envelope" /></button>
            </footer>
            <section ref={ref} id="support" className='hidden' >
                <div className="card" id="chat2">
                    <div className="card-header d-flex justify-content-between align-items-center p-3">
                        <div>
                            <h5 className="mb-0">Customer Support</h5>
                            <p>(Nhấn /end để kết thúc)</p>
                        </div>
                        <button type="button" className="btn btn-primary btn-sm" data-mdb-ripple-color="dark">Let's Chat
                            App</button>
                    </div>
                    <div className="card-body" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: 400 }}>
                        <ScrollToBottom className="message-container">
                            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                                <div>
                                    <p className="small p-2 ms-3 mb-1 text-white rounded-3 bg-primary" style={{ backgroundColor: '#f5f6f7' }}>ADMIN: Xin chào tôi có thể giúp gì cho bạn ?</p>
                                </div>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp" alt="avatar 1" style={{ width: 45, height: '100%' }} />
                            </div>
                            {

                                statemess.map((mes) =>
                                    mes?.user?.fullname != "supporter" ?
                                        (<div className="d-flex flex-row justify-content-start mb-4 ">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp" alt="avatar 1" style={{ width: 45, height: '100%' }} />
                                            <div>
                                                {
                                                    rendercontent(mes)
                                                }

                                            </div>
                                        </div>)

                                        :
                                        (<div className="d-flex flex-row justify-content-end mb-4 pt-1">
                                            <div>
                                                {mes.mess.includes("imgchat") || mes.mess.includes("videochat") ?
                                                    mes.mess.includes("imgchat") ?
                                                        <img style={{ width: "10rem", height: "10rem" }} src={`${url_be}/public/img/${mes.mess}`} alt="" />
                                                        : <video controls style={{ width: "10rem", height: "10rem" }} src={`${url_be}/public/img/${mes.mess}`}></video>
                                                    :
                                                    <p className="small p-2 ms-3 mb-1 text-white rounded-3 bg-primary" style={{ backgroundColor: '#f5f6f7' }}>Supporter: {mes.mess}</p>
                                                }
                                            </div>
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp" alt="avatar 1" style={{ width: 45, height: '100%' }} />
                                        </div>)
                                )
                            }
                        </ScrollToBottom>
                    </div>
                    {
                        statecheckemoji &&
                        <div className='emoji-section'>
                            <div className='emoji'>
                                {
                                    emojis.map(e => <span onClick={() => senemoji(e)} >{e}</span>)
                                }

                            </div>

                        </div>
                    }
                    <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp" alt="avatar 4" style={{ width: 40, height: '100%' }} />
                        <input onKeyDown={keydownhandler} value={stateinput} onChange={(e) => setinput(e.target.value)} type="text" className="form-control form-control-lg" id="exampleFormControlInput1" placeholder="Enter message!" />
                        <input ref={refimg} onChange={changeuploadfile} type="file" style={{ display: "none" }} />
                        <FontAwesomeIcon onClick={() => refimg.current.click()} style={{ marginLeft: " 0.5rem" }} icon="fa-solid fa-paperclip" >
                        </FontAwesomeIcon>
                        <FontAwesomeIcon onClick={() => setcheckemoji((prev) => !prev)} style={{ margin: "auto 0.5rem" }} icon="fa-solid fa-face-smile" />
                        <FontAwesomeIcon onClick={sendmess} icon="fa-solid fa-paper-plane" />
                    </div>
                </div>
            </section>

        </>
    )
}

export default Footer;