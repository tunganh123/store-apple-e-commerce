import React, { useState, useRef, useEffect } from 'react';
import { Fetchdataget } from '../utils/fetchdata';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SessionItem } from './item/SessionItem';
import ScrollToBottom from "react-scroll-to-bottom"
import io from "socket.io-client"
import { useAlert } from 'react-alert'
import { getCookie } from "react-use-cookie"
import "../css/Livechat.css"
const Livechat = () => {
    const tkadmin = getCookie("tokenadmin")
    const alerttem = useAlert()
    const [statesocketcurent, setstatesocketcurent] = useState([])
    // Danh sach session ket noi
    const [statesession, setstatesession] = useState([])
    //popup/out messs
    const [statecheck, setstatecheck] = useState(false)
    // state save sess
    const [statesess, setstatesess] = useState("")
    // Danh sach tin nhan
    const [statemess, setstatemess] = useState([])
    // Noi dung tin nhan tu the input
    const [stateinput, setinput] = useState("")
    // show/not show enmoji
    const [statecheckemoji, setcheckemoji] = useState(false)
    // refimg
    const refimg = useRef()
    // connect socketio
    const socket = io.connect(process.env.REACT_APP_URL_FETCH)
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
    // Khi click vao 1 session
    const clickshowsession = async (data) => {
        let datanew = {
            session: data.session,
            socketcurent: statesocketcurent,
            sk: socket.id
        }
        await socket.emit("setsessionadmin", datanew)
        //Luu session vua click vao state
        setstatecheck(true)
        setstatesess(data.session)
        setstatesocketcurent(socket.id)
        // // Lay danh sach tin nhan ( Luc chua ket noi vao roomID thi nguoi
        // // dung da gui tin nhan)
        await socket.on("getmess", (dat) => {
            setstatemess(dat) // Hien thi ra man hinh chat
        })


    }
    useEffect(() => {
        const fetchlivechat = async () => {
            const result = await Fetchdataget("livechat", tkadmin);
            if (result.err) {
                alert(result.err)
                return
            }
            setstatesession(result)
        }
        fetchlivechat()
    }, [])
    useEffect(() => {
        // Lang nghe session ket noi
        socket.on("getsession", (dat) => {
            let data = {
                ...dat,
            }
            setstatesession((prev) => [...prev, data])
        })
        //Lang nghe khi nguoi dung tat chat
        socket.on("user-leave", (dat) => {
            if (dat) {
                alerttem.error(`User ${dat.name} đã thoát khỏi room chat`)
                setstatesession(dat.sessfilter)
                setstatecheck(false)
            }
        })
    }, [])

    socket.on("reciver", (dat) => {
        if (dat.user.fullname != "supporter") {
            setstatemess((prev) => [...prev, dat])
        }
    })
    socket.on("getimg", (dat) => {
        if (dat.user.fullname != "supporter") {
            setTimeout(() => {
                setstatemess((prev) => [...prev, dat])
            }, 5000);
        }
    })
    // Nhan tin nhan tu phia client
    let datasupport = {
        sess: statesess,
        mess: stateinput,
        user: {
            fullname: "supporter"
        }
    }
    // gui tin nhan tu click
    const sentmesshandler = async (e) => {
        setstatemess((prev) => [...prev, datasupport])
        setinput("")
        await socket.emit("sendmess", datasupport)
    }
    // gui tin nhan tu nhan enter
    const keydownhandler = async (e) => {
        if (e.key == "Enter") {
            setstatemess((prev) => [...prev, datasupport])
            setinput("")
            await socket.emit("sendmess", datasupport)
        }
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
                const result = await fetch(`${process.env.REACT_APP_URL_FETCH}/saveimgchat`, {
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

            let data = {
                mess: reader.result,
                sess: statesess,
                user: {
                    fullname: "supporter"
                }
            };
            setstatemess((prev) => [...prev, data])
        }
        //     // Set data để gửi tn
        let data = {
            mess: newfilename,
            sess: statesess,
            user: {
                fullname: "supporter"
            }
        };
        socket.emit('uploadImage', data);
        reader.readAsDataURL(file);

    }
    function rendercontent(mes) {
        if (mes.mess.includes("imgchat") || mes.mess.includes("base64") || mes.mess.includes("videochat")) {
            if (mes.mess.includes("imgchat")) {
                return <img style={{ width: "10rem", height: "10rem" }} src={`${process.env.REACT_APP_URL_FETCH}/public/img/${mes.mess}`} alt="" />
            }
            if (mes.mess.includes("videochat")) {
                return <video controls style={{ width: "10rem", height: "10rem" }} src={`${process.env.REACT_APP_URL_FETCH}/public/img/${mes.mess}`}></video>
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 4fr", }}>
                <section style={{ padding: "1rem" }}>
                    <input style={{ marginBottom: "1rem" }} type="text" className='form-control' placeholder='Search Contact' />
                    {
                        statesession.map((item) => <SessionItem clickshowsession={clickshowsession} item={item} />)
                    }
                </section>
                <section id="support" style={{ display: statecheck ? "" : "none" }} >
                    <div className="card" id="chat2">
                        <div className="card-header d-flex justify-content-between align-items-center p-3">
                            <h5 className="mb-0">Customer Support</h5>
                            <button type="button" className="btn btn-primary btn-sm" data-mdb-ripple-color="dark">Let's Chat
                                App</button>
                        </div>
                        <div className="card-body" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: 500 }}>
                            <ScrollToBottom className="message-container">
                                {
                                    statemess.map((mes) =>
                                        mes?.user?.fullname != "supporter" ?
                                            (<div className="d-flex flex-row justify-content-end mb-4 pt-1">
                                                <div>
                                                    {mes.mess.includes("imgchat") || mes.mess.includes("videochat") ?
                                                        mes.mess.includes("imgchat") ?
                                                            <img style={{ width: "10rem", height: "10rem" }} src={mes.mess.includes("imgchat") ? `${process.env.REACT_APP_URL_FETCH}/public/img/${mes.mess}` : mes.mess} alt="" />
                                                            : <video controls style={{ width: "10rem", height: "10rem" }} src={`${process.env.REACT_APP_URL_FETCH}/public/img/${mes.mess}`}></video>
                                                        :
                                                        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">{mes?.user?.fullname}: {mes?.mess}</p>
                                                    }
                                                </div>
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp" alt="avatar 1" style={{ width: 45, height: '100%' }} />
                                            </div>)
                                            :
                                            (<div className="d-flex flex-row justify-content-start mb-4">
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp" alt="avatar 1" style={{ width: 45, height: '100%' }} />
                                                <div>
                                                    {
                                                        rendercontent(mes)
                                                    }
                                                </div>
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
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp" alt="avatar 3" style={{ width: 40, height: '100%' }} />
                            <input onKeyDown={keydownhandler} value={stateinput} onChange={(e) => setinput(e.target.value)} type="text" className="form-control form-control-lg" id="exampleFormControlInput1" placeholder="Enter message!" />
                            <input ref={refimg} onChange={changeuploadfile} type="file" accept="image/*" style={{ display: "none" }} />
                            <FontAwesomeIcon onClick={() => refimg.current.click()} style={{ marginLeft: " 0.5rem" }} icon="fa-solid fa-paperclip" >
                            </FontAwesomeIcon>
                            <FontAwesomeIcon onClick={() => setcheckemoji((prev) => !prev)} style={{ margin: "auto 0.5rem" }} icon="fa-solid fa-face-smile" />
                            <FontAwesomeIcon onClick={sentmesshandler} icon="fa-solid fa-paper-plane" />
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Livechat;
