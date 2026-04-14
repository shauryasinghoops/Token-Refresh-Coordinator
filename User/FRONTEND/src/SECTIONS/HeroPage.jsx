import React from "react";
import desktop from "../assets/desktopImage.png"

const HeroPage = () => {
    return (
        <div className="w-full min-h-screen relative bg-black flex justify-center bg-line ">
            <div
                className="w-full min-h-screen absolute inset-0 z-10"
                style={{ background: 'linear-gradient(to top, #065f46 10%, #000000 80%)' }}
            ></div>
            <div className="mt-[8vw] font-medium text-[5vw] text-white onlyFont text-center absolute z-20 slideup ">
                <span className=" bg-clip-text text-transparent font-semibold bg-gradient-to-b  from-white/85 to-zinc-400 " >Looking For Secure AuthN &
                    <br />
                    Token Generation</span>

                <p className="text-sm text-zinc-200 font-medium capitalize italic">A Sceured Platform that provide AuthN & AuthZ Solution with token generation and token regershment as Solution</p>


                <div className="w-[89vw] h-[40vw] bg-black mt-20 rounded-2xl ">
                    <img src={desktop} alt="System Architecture Overview" className="w-full h-full rounded-2xl" />
                </div>
            </div>



        </div>
    );
};

export default HeroPage;
