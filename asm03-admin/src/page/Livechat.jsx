import React, { useState, useRef, useEffect } from 'react';
import { Fetchdata, Fetchdataget } from '../utils/fetchdata';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '../componend/UI/Sidebar';
import { SessionItem } from './item/SessionItem';
import ScrollToBottom from "react-scroll-to-bottom"
import io from "socket.io-client"
import { useAlert } from 'react-alert'
import { getCookie } from "react-use-cookie"
import "./Livechat.css"
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
    // connect socketio
    const socket = io.connect(process.env.REACT_APP_URL_FETCH)
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
    return (
        <>
            <>
                {/* Page Wrapper */}
                <div id="wrapper">
                    {/* Sidebar */}
                    <Sidebar />
                    {/* End of Sidebar */}
                    {/* Content Wrapper */}
                    <div style={{ padding: "2rem" }} id="content-wrapper" className="d-flex flex-column">
                        {/* Main Content */}
                        <div id="content">
                            {/* Topbar */}
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
                                                                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">{mes?.user?.fullname}: {mes?.mess}</p>

                                                                </div>
                                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp" alt="avatar 1" style={{ width: 45, height: '100%' }} />
                                                            </div>)
                                                            :
                                                            (<div className="d-flex flex-row justify-content-start mb-4">
                                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp" alt="avatar 1" style={{ width: 45, height: '100%' }} />
                                                                <div>
                                                                    <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: '#f5f6f7' }}>Supporter: {mes?.mess}</p>
                                                                </div>
                                                            </div>)

                                                    )
                                                }
                                            </ScrollToBottom>
                                        </div>
                                        <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp" alt="avatar 3" style={{ width: 40, height: '100%' }} />
                                            <input onKeyDown={keydownhandler} value={stateinput} onChange={(e) => setinput(e.target.value)} type="text" className="form-control form-control-lg" id="exampleFormControlInput1" placeholder="Enter message!" />
                                            <a className="ms-1 text-muted" href="#!"><FontAwesomeIcon icon="fa-solid fa-paperclip" /></a>
                                            <a className="ms-3 text-muted" href="#!"><FontAwesomeIcon icon="fa-solid fa-face-smile" /></a>
                                            <a className="ms-3" onClick={sentmesshandler}><FontAwesomeIcon icon="fa-solid fa-paper-plane" /></a>
                                        </div>
                                    </div>
                                </section>
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

        </>
    )
}

export default Livechat;