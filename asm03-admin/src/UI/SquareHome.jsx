import React from 'react'

export const SquareHome = ({ value, lett, children }) => {
    return (
        <div className="col-4">
            <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{value}</div>
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">{lett}</div>
                        </div>
                        <div className="col-auto">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
