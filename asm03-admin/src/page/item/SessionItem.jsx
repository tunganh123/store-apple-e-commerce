import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const SessionItem = ({ item, clickshowsession, clickdelete }) => {

    return (
        <p onClick={() => clickshowsession(item)}><button style={{ margin: "auto", color: "white", border: "1px solid  red", backgroundColor: "red" }}> x </button> <FontAwesomeIcon key={item} icon="fa-solid fa-user" /> {item.session} (<b><i>{item.user}</i></b>)
        </p >
    )
}
