import React, { forwardRef } from 'react'

export const Input = forwardRef((props, ref) => {
    return (
        <input {...props} ref={ref} className='form-control' />
    )
})
export const TextArea = (props) => {
    return (
        <textarea {...props} className='form-control' />
    )
}
