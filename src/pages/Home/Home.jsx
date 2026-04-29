import React from 'react';
import Navbar from '../shared/navbar/navbar';
import useAuth from '../../hooks/useAuth';

const Home = () => {
    const {user} = useAuth()
    console.log(user)
    return (
        <div>
            Home
        </div>
    );
};

export default Home;