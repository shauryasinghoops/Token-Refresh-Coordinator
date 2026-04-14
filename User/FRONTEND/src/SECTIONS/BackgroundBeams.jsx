"use client";
import React from "react";
import { motion } from "framer-motion"; 
import { cn } from "../lib/util";

export const BackgroundBeams = React.memo(({ className }) => {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    
  ];

  return (
    <div
      className={cn(
       
        "absolute inset-0 z-0 h-full w-full pointer-events-none", 
        className
      )}>
      <svg
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
       
      </svg>
    </div>
  );
});

BackgroundBeams.displayName = "BackgroundBeams";