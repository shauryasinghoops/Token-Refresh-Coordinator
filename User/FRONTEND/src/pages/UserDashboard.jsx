import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import { useLocation } from 'react-router-dom';
import Profile from '../SECTIONS/Profile';
import SystemDesign from '../SECTIONS/SystemDesign';

const UserDashboard = () => {
    const { user, logout } = useAuth();

    const isprofile = useLocation().pathname === '/dashboard/profile';
    const issystemdesign = useLocation().pathname === '/dashboard/systemdesign';

    return (
        <div className="h-screen bg-black font-sans flex flex-col">
            <nav className="h-20 border-b border-zinc-800 flex items-center justify-between px-8 bg-black shrink-0">
                <div className="text-white uppercase text-md font-bold flex items-center gap-10">
                    <Link to="/" className='text-yellow-100 flex items-center gap-2 hover:text-white'> 
                        <FaArrowLeft />Back
                    </Link>
                    User's Dashboard
                </div>

                <div className="flex items-center gap-6">
                    <span className="text-md text-zinc-500 font-medium">
                        <span className="text-white uppercase">Hello, <span className='text-yellow-100'>{user?.name}</span></span>
                    </span>
                    <button
                        onClick={logout}
                        className="bg-white text-black text-xs font-bold px-4 py-1.5 rounded hover:bg-zinc-200 transition-colors uppercase"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className='flex-1 flex overflow-hidden'>
                <div className='w-1/8 h-full bg-black border-r border-zinc-800'>
                    <Sidebar />
                </div>
                <div className='flex-1 h-full bg-black overflow-y-auto'>
                    {isprofile && <Profile />}
                    {issystemdesign && <SystemDesign />}
                </div>
            </div>
        </div >
    );
};

export default UserDashboard;