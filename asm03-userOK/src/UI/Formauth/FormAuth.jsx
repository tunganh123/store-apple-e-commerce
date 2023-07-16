import React from 'react'
import "./FormAuth.css"
export const FormAuth = ({ submitHandler, children, title = "Sign Up" }) => {

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{ borderRadius: 15 }}>
                            <div className="card-body p-4 p-md-5  ">
                                <h2 className="mb-4 pb-2 pb-md-0 mb-md-5 " style={{ display: "flex", justifyContent: "center" }} ><i>{title}</i> </h2>
                                {/* Email input */}
                                <form onSubmit={submitHandler}>
                                    {children}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
