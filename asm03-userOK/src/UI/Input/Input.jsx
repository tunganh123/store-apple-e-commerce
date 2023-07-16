import React, { forwardRef } from 'react'

export const Input = forwardRef((props, ref) => {
    const { stylebot } = props
    return (
        <input onKeyUp={props.onKeyUp} {...props} style={{ height: "3.5rem", borderRadius: "0px", ...stylebot }} ref={ref} className="form-controls" />
    )
})

export const InputLable = (props) => {
    return (
        <div className='inputlabl'>
            <label style={{ textTransform: "uppercase" }} htmlFor="">{props.name} :</label> <br />
            <input {...props} style={{ width: "100%", height: "3rem", borderRadius: "0px" }} className="form-control" />
        </div>
    )
}