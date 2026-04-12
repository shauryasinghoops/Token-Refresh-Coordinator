import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaChevronRight, FaTimes } from 'react-icons/fa';

const Team = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="w-full h-180 bg-black flex justify-center items-center relative overflow-hidden font-sans border-t-1 border-zinc-800">

            {/* Blue Ambient Glow (Animated on Entrance) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{
                    x: mousePos.x - 300,
                    y: mousePos.y - 300,
                }}
                transition={{
                    opacity: { duration: 1.5 },
                    scale: { duration: 2 },
                    x: { type: "spring", stiffness: 50, damping: 20 },
                    y: { type: "spring", stiffness: 50, damping: 20 }
                }}
                className="absolute w-[600px] h-[600px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none z-0"
            ></motion.div>

            {/* 1. Static Content Layer (Premium Staggered Blur Reveal) */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.15 } }
                }}
                className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${isMenuOpen ? 'opacity-0 scale-90 blur-2xl' : 'opacity-100'}`}
            >
                <motion.h1
                    variants={{
                        hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
                        visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                    }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-6xl font-black text-white tracking-tighter uppercase leading-none"
                >
                    Want to meet the Developers
                </motion.h1>
                <motion.h1
                    variants={{
                        hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
                        visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                    }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-6xl font-black text-white tracking-tighter uppercase leading-none mt-2"
                >
                    Behind This Project ?
                </motion.h1>
            </motion.div>

            {/* 2. Right-Center Action Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="absolute right-12 z-50 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all cursor-pointer group shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
                {isMenuOpen ? (
                    <FaTimes size={24} className="rotate-90" />
                ) : (
                    <FaChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                )}
            </button>

            {/* 3. The Sliding Infinite Carousel Layer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                        className="absolute inset-0 bg-white z-40 overflow-hidden"
                    >
                        {/* INFINITE SCROLLING CONTAINER */}
                        <motion.div
                            className="flex h-full w-fit"
                            animate={{ x: ['0%', '-50%'] }} // Scroll half way (across the clones)
                            transition={{
                                duration: 18,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            {/* Slide Pack 01 */}
                            <TeamSlide name="Frontend" color="bg-white" />
                            <TeamSlide name="Backend Developer" color="bg-white" />
                            <TeamSlide name="UI Designer" color="bg-white" />


                            {/* Clone Pack (The "Mirror" for infinite effect) */}
                            <TeamSlide name="Lead Architect" color="bg-white" />
                            <TeamSlide name="Backend Dev" color="bg-white" />
                            <TeamSlide name="UI Designer" color="bg-white" />

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const TeamSlide = ({ name, color }) => (
    <div className={`w-[100vw] h-full ${color} flex flex-col items-center justify-center border-r-30 border-black`}>
        <div className="space-y-4 text-center">

            <h2 className="text-4xl font-black text-black uppercase tracking-tighter">{name}</h2>
            <div className="h-px w-20 bg-black/20 mx-auto"></div>

        </div>
    </div>
)

export default Team;