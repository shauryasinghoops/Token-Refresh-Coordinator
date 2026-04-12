const About = () => {
    return (
        <div className="w-full h-auto bg-black flex justify-center flex-col items-center gap-10">
            <div>
                <h1 className="text-white text-5xl font-bold mt-129">
                    <span className="text-green-900">Why</span> Choose Us ?
                </h1>
            </div>

            <div className="w-full h-150 flex justify-between items-center px-10 py-9 gap-10">
                
                <div className="w-full h-full ring-1 ring-white/10 backdrop-blur-md flex flex-col justify-center items-center text-center p-6">
                    <h2 className="text-white text-xl font-semibold mb-2">Fast Performance</h2>
                
                </div>

                <div className="w-full h-full ring-1 ring-white/10 backdrop-blur-md flex flex-col justify-center items-center text-center p-6">
                    <h2 className="text-white text-xl font-semibold mb-2">Secure System</h2>
                  
                </div>

                <div className="w-full h-full ring-1 ring-white/10 backdrop-blur-md flex flex-col justify-center items-center text-center p-6">
                    <h2 className="text-white text-xl font-semibold mb-2">User Friendly</h2>
                   
                </div>

                <div className="w-full h-full ring-1 ring-white/10 backdrop-blur-md flex flex-col justify-center items-center text-center p-6">
                    <h2 className="text-white text-xl font-semibold mb-2">Scalable</h2>
                  
                </div>

            </div>
        </div>
    );
};

export default About;