import React from 'react';
import "./pagecss/Homepage.css"
import { linkfetch } from '..';
import Bannerhomepage from './Homepage/Bannerhomepage';
import Typeproduct from './Homepage/Typeproduct';
import Listproduct from './Homepage/Listproduct';
import More from './Homepage/More';
const HomePage = () => {
    return (
        <>
            <div className='homepage'>
                <section className='bannerhomepage'>
                    <Bannerhomepage />
                </section>
                <section className='typeproduct'>
                    <Typeproduct />
                </section>
                <section className='listproduct'>
                    <Listproduct />
                </section>
                <section className='more'>
                    <More />
                </section>
            </div>
        </>
    )
}
export default HomePage;
export const fetchdata = async () => {
    const response = await fetch(linkfetch, {
        headers: {
            //"Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        }
    },)
    return response
}
