import React from 'react';
import Navbar from '../pages/shared/navbar/navbar';
import { Outlet } from 'react-router';
import authimg from '../assets2/authImage.png'

const AuthLayout = () => {
    return (

        <>
            <Navbar></Navbar>

            <div className='grid grid-cols-2 border min-h-screen'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>

                <div className='rounded-sm bg-neutral'>

                    <div className='flex justify-center items-center h-full'>
                         <img className='text-primary' src={authimg} alt="" />
                    </div>
                   



                </div>
            </div>



        </>

    );
};

export default AuthLayout;