import React from 'react';
import AuthEImage from '../assets/Auth-Ē.png'

const Footer = () => {
    return (
        <footer className="w-full h-200 rounded-4xl border-t-2 border-zinc-600 bg-zinc-950 text-white py-20 px-10 relative overflow-hidden font-sans">

            <div className="w-full h-100 p-4 bg-white rounded-4xl border-4 border-black flex justify-between gap-1">
                <div className='w-90 h-full bg-black rounded-3xl items-center justify-center flex'>
                    <img src={AuthEImage} className='size-60'></img>

                </div>
                <div className='w-[calc(100%-100px)] h-full  rounded-3xl flex justify-end items-center'>
                    <div className='w-auto h-auto font-medium text-5xl text-black italic'>
                        <p>"Save your data with us - we care about your data  "</p>
                    </div>

                </div>

            </div>

            
            <div className="mt-20 md:mt-0 md:absolute md:bottom-[-5vw] md:left-0 w-full flex justify-center pointer-events-none select-none">
                <h1 className="text-[18vw] font-black text-white/35 leading-none tracking-tighter opacity-100">
                    AUTHENTICATE
                </h1>
            </div>

        </footer>
    );
};

export default Footer;
