import React from 'react';

import { Routes, Route, Switch, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import LeftSidebar from '../components/LeftSidebar';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Homepage from './Homepage';
import HoursRecord from './HoursRecord';
import ProfilePage from './ProfilePage';
// import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    const { pathname } = useLocation();
    return (
        <div>
            <Header></Header>
            <div className="flex justify-center w-full">
                <div className="">
                    <LeftSidebar />
                </div>
                <div className="flex-grow flex justify-center">
                    {/* {pathname === '/dashboard' && <Homepage />}
                    {pathname === '/dashboard/hours' && <HoursRecord />}
                    {pathname === '/dashbaord/profile' && <ProfilePage />} */}
                    <Outlet/>
                </div>
            </div>
            <Navbar></Navbar>
        </div>
    );
};

export default Dashboard;
