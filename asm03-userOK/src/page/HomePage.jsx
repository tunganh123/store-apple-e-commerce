import React from 'react';
import "./pagecss/Homepage.css"
import Bannerhomepage from '../features/Homepage/Bannerhomepage';
import Typeproduct from '../features/Homepage/Typeproduct';
import Listproduct from '../features/Homepage/Listproduct';
import More from '../features/Homepage/More';
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
