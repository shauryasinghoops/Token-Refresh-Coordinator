import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutheImage from "../assets/Auth-Ē.png";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isContactHovered, setIsContactHovered] = useState(false);

  return (
    <nav 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black slidedown border-b border-white/5"
        onMouseLeave={() => setIsContactHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-white shrink-0"
        >
          <img
            src={AutheImage}
            alt="Authē Logo"
            className="brand-logo"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link to="/" className="text-white transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-white transition-colors">
            About
          </Link>
          <Link to="/services" className="text-white transition-colors">
            Services
          </Link>
          <div 
            className="py-2"
            onMouseEnter={() => setIsContactHovered(true)}
          >
            <Link to="/contact" className="text-white transition-colors">
                Contact
            </Link>
          </div>
          <Link to="/meet-the-team" className="text-white transition-colors">
            GitHub Connect
          </Link>
        </div>

        <div className="flex items-center gap-5 text-sm">
          <Link to="/login" className="text-zinc-400 hover:text-white transition-colors font-medium">
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2.5 rounded bg-white text-black font-medium hover:opacity-90 hover:font-bold duration-300 cursor-pointer "
          >
            Get Started
          </Link>
        </div>
      </div>

      {}
      <AnimatePresence>
        {isContactHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/5 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-10 py-12 flex justify-between items-center text-white">
                <div className="space-y-2">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase ">Support Baseline</p>
                    <h4 className="text-xl font-bold "><a target="_blank" href="https://www.gmail.com">support@auth.com</a></h4>
                </div>
                <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>
                <div className="space-y-2">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em]">Phn / Contact</p>
                    <h4 className="text-2xl font-bold ">+91 9XXXXXXXXX</h4>
                </div>
                <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>
                <div className="space-y-2">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em]">Address</p>
                    <h4 className="text-2xl font-bold ">Some Where in GLA University</h4>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;