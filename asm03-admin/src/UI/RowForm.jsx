import React from 'react'
export const RowForm = ({ children, title }) => {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <div className="form-outline">
                <label className="form-label" htmlFor="form6Example1">{title}</label>
                {children}
            </div>
        </div>
    )
}
