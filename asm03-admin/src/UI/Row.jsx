import React from 'react'

export const Row = ({ children, style }) => {
    return (
        <div className="row" style={{ ...style }} >
            {children}
        </div>
    )
}
