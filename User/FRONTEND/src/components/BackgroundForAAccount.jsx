import React from "react";
import { BackgroundBeams } from "./ui/BackgroundBeams";

export function BackgroundForAAccount({ children }) {
  return (
    <div className="h-screen w-full relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 z-10 w-full">
        {children}
      </div>
      <div className="absolute inset-0 -z-10 pointer-events-none bg-zinc-950">
        <BackgroundBeams />
      </div>
    </div>
  );
}