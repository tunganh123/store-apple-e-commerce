import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import stateadmin from '../store/stateadmin';
import { useCookies } from 'react-cookie';
const Navi = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['tokenadmin']);
    const action = stateadmin.actions;
    const dispatch = useDispatch()
    const adminfullname = useSelector((state) => state.admin).fullname;
    const logouthandler = () => {
        removeCookie("tokenadmin")
        dispatch(action.logoutadmin())
    }

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <label htmlFor="" style={{ marginBottom: "0", color: "rgb(8, 161, 41)", fontWeight: "700", fontSize: "1.3rem" }} >Hello {adminfullname}</label>
                {
                    adminfullname &&
                    <Link to={"/login"} onClick={logouthandler} style={{ margin: "1rem", border: "none", textDecoration: "none" }}>Logout</Link>
                }
            </div>
        </>
    )
}

export default Navi;