import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const About = () => {
    return (
        <div id="about" className="w-full h-auto bg-black flex justify-center flex-col items-center gap-10">
            <div>
                <h1 className="text-white text-5xl font-bold mt-140">
                    <span className="text-green-900">What</span> We Provide?
                </h1>
            </div>

            <div className="w-full h-150 flex justify-between items-center px-10 py-9 gap-10">

                <div className="w-full h-3/4 ring-1 bg-[#065f46] text-white ring-white/10 backdrop-blur-md flex flex-col justify-between p-6 rounded-2xl ">

                    <div className="w-full">
                        <h2 className="text-white text-3xl md:text-4xl font-bold mb-3 tracking-tight leading-tight">
                            Fast Performance
                        </h2>

                        <p className="text-white text-base md:text-lg font-medium tracking-tight leading-relaxed">
                            Experience sub-millisecond authentication with our optimized backend infrastructure.
                        </p>
                        <p className="text-white text-base md:text-lg font-medium tracking-tight leading-relaxed">
                            Designed for high-concurrency environments with smart load balancing and caching.
                        </p>
                        <p className="text-white text-base md:text-lg font-medium tracking-tight leading-relaxed">
                            Lightning-fast token validation across global nodes to ensure zero latency.
                        </p>
                    </div>

                    <Link to="/signup" className="mt-6 w-fit bg-black px-6 py-3 text-white text-lg font-medium tracking-tight rounded-full flex items-center gap-2">
                        Start Now <FaArrowRight />
                    </Link>

                </div>

                <div className="w-full h-3/4 ring-1 bg-white text-black backdrop-blur-md flex flex-col justify-between p-6 rounded-2xl ">

                    <div className="w-full">
                        <h2 className="text-black text-3xl md:text-4xl font-bold mb-3 tracking-tight leading-tight">
                            Highly Secure
                        </h2>

                        <p className="text-black text-base md:text-lg font-medium tracking-tight leading-relaxed">
                            Industry-standard JWT authentication paired with secure, rotated refresh tokens.
                        </p>
                        <p className="text-black text-base md:text-lg font-medium tracking-tight leading-relaxed">
                            All credentials and session data are stored in HTTP-only, secure, and samesite cookies.
                        </p>
                        <p className="text-black text-base md:text-lg font-medium tracking-tight leading-relaxed">
                            Robust protection against XSS and CSRF attacks integrated into every endpoint.
                        </p>
                    </div>

                    <Link to="/signup" className="mt-6 w-fit bg-black px-6 py-3 text-white text-lg font-medium tracking-tight rounded-full flex items-center gap-2">
                        Start Now <FaArrowRight />
                    </Link>

                </div>

                <div className="w-full h-3/4 ring-1 bg-[#065f46] text-white ring-white/10 backdrop-blur-md flex flex-col justify-between p-6 rounded-2xl ">

                    <div className="w-full">
                        <h2 className="text-white text-3xl md:text-4xl font-bold mb-3 tracking-tight leading-tight">
                            Seamless Integration
                        </h2>

                        <p className="text-white text-base md:text-lg font-medium tracking-tight leading-relaxed">
                            Plug-and-play SDKs and REST APIs for React, Next.js, and other modern frameworks.
                        </p>
                        <p className="text-white text-base md:text-lg font-medium tracking-tight leading-relaxed">
                            Comprehensive documentation and ready-to-use Boilerplates for instant deployment.
                        </p>
                        <p className="text-white text-base md:text-lg font-medium tracking-tight leading-relaxed">
                            Scalable user management dashboard to monitor sessions and security events in real-time.
                        </p>
                    </div>

                    <Link to="/signup" className="mt-6 w-fit bg-black px-6 py-3 text-white text-lg font-medium tracking-tight rounded-full flex items-center gap-2">
                        Start Now <FaArrowRight />
                    </Link>

                </div>

            </div>
        </div>
    );
};

export default About;