import React from 'react';
import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';
import AuthEImage from '../assets/Auth-Ē.png';

const Footer = () => {
    return (
        <footer className="w-full rounded-t-[3rem] md:rounded-t-[4rem] border-t border-zinc-800 bg-black text-white relative overflow-hidden font-sans pt-24 pb-8 md:pt-32">
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-40 md:mb-64">
                
                <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-start gap-6">
                    <img src={AuthEImage} alt="Auth Logo" className="w-32 brightness-0 invert opacity-90" />
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                        Production-grade authentication infrastructure. Secure, lightning-fast, and built for modern scale.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="https://github.com/shauryasinghoops/Token-Refresh-Coordinator" className="text-zinc-400 hover:text-white transition-all" target='_blank'><FaGithub size={20} /></a>
                        <a href="#" className="text-zinc-400 hover:text-white transition-all"><FaTwitter size={20} /></a>
                        <a href="#" className="text-zinc-400 hover:text-white transition-all"><FaDiscord size={20} /></a>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-[-2vw] left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden">
                <h1 className="text-[17vw] font-black text-white/5 leading-none tracking-tighter">
                    AUTHENTICATE
                </h1>
            </div>
        </footer>
    );
};

export default Footer;