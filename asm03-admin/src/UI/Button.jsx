import React from 'react'

export const Button = ({ children, onClick, sty }) => {
    return (
        <button onClick={onClick} style={{ padding: "0.3rem 0.7rem ", margin: "auto", color: "white", ...sty }}>{children}</button>
    )
}
