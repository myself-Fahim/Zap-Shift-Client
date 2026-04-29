import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {

    const { user,logOut } = useAuth()

    const link = <>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/service'>Services</NavLink>

    </>

    const handleLogout = () =>{
        logOut()
        .then()
        .catch(err => console.log(err))
    }
    return (
        <div>
            <div className="navbar bg-primary text-white px-5 lg:px-17">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {link}
                        </ul>
                    </div>
                    <a className="font-bold text-xl">Zap-Shift</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex gap-3">
                        {link}
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* <Link className='border px-5 py-1 rounded-sm bg-neutral text-primary font-semibold'>Login</Link> */}
                    {
                        user ? <button onClick={handleLogout} className='border px-5 py-1 rounded-sm bg-neutral text-primary font-semibold'>Log Out</button>
                            : <Link className='border px-5 py-1 rounded-sm bg-neutral text-primary font-semibold' to='/login'>Login</Link>

                    }


                </div>
            </div>
        </div>
    );
};

export default Navbar;