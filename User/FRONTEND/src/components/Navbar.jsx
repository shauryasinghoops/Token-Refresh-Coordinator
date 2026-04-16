import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutheImage from "../assets/Auth-Ē.png";

const Navbar = () => {
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);

  return (
    <nav 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black slidedown border-b border-white/5"
        onMouseLeave={() => {
          setIsContactHovered(false);
          setIsServicesHovered(false);
        }}
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
          <a href="#about" className="text-white transition-colors cursor-pointer">
            About
          </a>
          <div 
            className="py-2"
            onMouseEnter={() => {
              setIsServicesHovered(true);
              setIsContactHovered(false);
            }}
          >
            <span className="text-white transition-colors cursor-pointer">
                Services
            </span>
          </div>
          <div 
            className="py-2"
            onMouseEnter={() => {
              setIsContactHovered(true);
              setIsServicesHovered(false);
            }}
          >
            <span className="text-white transition-colors cursor-pointer">
                Contact
            </span>
          </div>
          <a href="#team" className="text-white transition-colors cursor-pointer">
            GitHub Connect
          </a>
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
      {isContactHovered && (
        <div className="absolute top-full left-0 w-full bg-black border-b border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-10 py-12 flex justify-between items-center text-white">
              <div className="space-y-2">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase ">Support Baseline</p>
                  <h4 className="text-xl font-bold "><a target="_blank" href="mailto:support@auth.com">support@auth.com</a></h4>
              </div>
              <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>
              <div className="space-y-2">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase ">Phn / Contact</p>
                  <h4 className="text-2xl font-bold ">+91 9XXXXXXXXX</h4>
              </div>
              <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>
              <div className="space-y-2">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase ">Address</p>
                  <h4 className="text-2xl font-bold ">Some Where in GLA University</h4>
              </div>
          </div>
        </div>
      )}

      {isServicesHovered && (
        <div className="absolute top-full left-0 w-full bg-black border-b border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-10 py-12 flex justify-between items-center text-white">
              <div className="space-y-2 max-w-[200px]">
                  <p className="text-[10px] text-green-500 font-bold uppercase ">Security</p>
                  <h4 className="text-lg font-bold ">Autehntication</h4>
                  <p className="text-xs text-zinc-500">Seamless Authentication</p>
              </div>
              <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>
              <div className="space-y-2 max-w-[200px]">
                  <p className="text-[10px] text-green-500 font-bold uppercase ">JWT Tokens</p>
                  <h4 className="text-lg font-bold ">Token Refresh</h4>
                  <p className="text-xs text-zinc-500">Seamless Token Refresh</p>
              </div>
              <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>
              <div className="space-y-2 max-w-[200px]">
                  <p className="text-[10px] text-green-500 font-bold uppercase ">Shell Script</p>
                  <h4 className="text-lg font-bold ">Token Rotation</h4>
                  <p className="text-xs text-zinc-500">Token Rotation</p>
              </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;