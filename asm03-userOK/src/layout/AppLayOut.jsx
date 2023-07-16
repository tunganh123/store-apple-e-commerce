import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { ChatApp } from '../page/ChatApp'

export const AppLayOut = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
            <ChatApp />
        </>
    )
}
