import React from 'react';
import "./Footer.css"
const Footer = () => {
    return (
        <>
            <footer className=" text-center " id='footerr'>
                <div className="container p-4">
                    <div className="row">
                        <div className="col-4 ">
                            <h5 className="text-uppercase">CUSTOMER SERVICES</h5>
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!" className="text-white">Help & Contact Us</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Return & Refunds</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Online Stores</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Tearms & Conditions</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-4 ">
                            <h5 className="text-uppercase mb-0">COMPANY</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="#!" className="text-white">What We Do</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Available Services</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Latest Posts</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">FAQs</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <h5 className="text-uppercase mb-0">SOCIAL MEDIA</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="#!" className="text-white">Twitter</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Instagram</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Facebook</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Pinterest</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}

export default Footer;
