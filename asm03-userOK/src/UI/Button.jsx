import React from 'react';
import "./Button.css"
const Button = ({ onClick, children, style, className }) => {
    return (
        <button id='btn' className={`btn ${className}`} style={{ ...style }} onClick={onClick}>{children}</button>
    )
}

export default Button;
