import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../pages/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='min-h-screen flex flex-col'>
           <Navbar></Navbar>
            <div className='flex-grow'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;