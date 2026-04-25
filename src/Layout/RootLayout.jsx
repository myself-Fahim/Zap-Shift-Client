import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/navbar/navbar';
import Footer from '../pages/shared/footer/footer';

const RootLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='max-w-[1400px] mx-auto '>
                <Outlet></Outlet>
            </div>
            {/* <Footer></Footer> */}

        </>

    );
};

export default RootLayout;