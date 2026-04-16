import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaChevronRight, FaTimes, FaGithub } from 'react-icons/fa';
import Shauryaa from '../assets/download.png';
import Shaurya from '../assets/Shaurya.png';
import Shobhit from '../assets/Shobhit.png';
import Shreyy from '../assets/downloadother.png';
import Shiv from   '../assets/shiv.png';
import Shrey from '../assets/wing-2.png';
import ShivamRai from '../assets/ShivamRai.png';
import downloadotherss from '../assets/downloadotherss.png';

const teamMembers = [
    {
        name: "Shaurya Pratap Singh",
        role: "Frontend Developer",
        image: Shauryaa,
        github: "https://github.com/shauryasinghoops",
        objectPosition: "50% 20%",

    },
        {
        name: "Shobhit Kumar Dubey",
        role: "Backend Developer",
        image: Shobhit,
        github: "https://github.com/shauryasinghoops",
        objectPosition: "50% 20%",
    },
    {
        name: "Shrey Rastogi",
        role: "Devops Engineer",
        image: Shreyy,
        github: "https://github.com/shauryasinghoops",
        objectPosition: "50% 20%",
    },
    {
        name: "Shivam Gupta",
        role: "Database Manager",
        image: Shiv,
        github: "https://github.com/shauryasinghoops",
        objectFit: "contain",
        objectPosition: "50% 50%",
    },
     {
        name: "Shivam Rai",
        role: "Backend Developer",
        image: downloadotherss,
        github: "https://github.com/shauryasinghoops",
        objectPosition: "50% 20%",
    }

];

// Repeat team members enough times to fill the infinite scroll
const slides = [...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers];

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
        <div id="team" className="w-full h-180 bg-black flex justify-center items-center relative overflow-hidden font-sans border-t border-zinc-800">

            {/* Ambient Glow */}
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
            />

            {/* Headline */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                className={`relative z-10 flex flex-col items-center transition-all duration-700 ${isMenuOpen ? 'opacity-0 scale-90 blur-2xl pointer-events-none' : 'opacity-100'}`}
            >
                <motion.h1
                    variants={{
                        hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
                        visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                    }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none text-center"
                >
                    Want to meet the Developers
                </motion.h1>
                <motion.h1
                    variants={{
                        hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
                        visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                    }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none mt-2 text-center"
                >
                    Behind This Project?
                </motion.h1>
                <motion.p
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.8 }}
                    className="text-zinc-500 text-base mt-5 tracking-wide"
                >
                    Click the arrow to explore →
                </motion.p>
            </motion.div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="absolute right-12 z-50 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all cursor-pointer group shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
                {isMenuOpen ? (
                    <FaTimes size={24} />
                ) : (
                    <FaChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                )}
            </button>

            {/* Sliding Team Carousel */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                        className="absolute inset-0 bg-white z-40 overflow-hidden"
                    >
                        <motion.div
                            className="flex h-full"
                            style={{ width: `${slides.length * 100}vw` }}
                            animate={{ x: ['0vw', `-${slides.length * 50}vw`] }}
                            transition={{ duration: slides.length * 5, repeat: Infinity, ease: "linear" }}
                        >
                            {slides.map((member, i) => (
                                <TeamSlide key={i} member={member} />
                            ))}
                        </motion.div>

                        {/* Close hint */}
                        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-600 text-xs tracking-widest uppercase">
                            Click → to close
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const TeamSlide = ({ member }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="w-[100vw] h-full flex items-center justify-center border-r border-zinc-200 bg-white relative overflow-hidden">

            {/* Left — Photo in grayscale */}
            <div
                className="w-1/2 h-full flex items-start justify-center overflow-hidden relative"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {member.image ? (
                    <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full transition-all duration-700"
                        style={{
                            filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)',
                            objectFit: member.objectFit || 'cover',
                            objectPosition: member.objectPosition || '50% 20%'
                        }}
                    />
                ) : (
                    <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
                        <span className="text-zinc-300 text-6xl font-black tracking-tighter">
                            {member.name.charAt(0)}
                        </span>
                    </div>
                )}

                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>

            {/* Right — Name + Role + GitHub */}
            <div className="w-1/2 h-full flex flex-col items-start justify-center px-14 relative">

                {/* GitHub logo watermark behind the name */}

                {/* Role tag */}
                <span className="text-lg  font-semibold text-black border p-4 border-black uppercase tracking-widest mb-4px-3 py-1 rounded-full">
                    {member.role}
                </span>

                {/* Name */}
                <h1 className="text-6xl md:text-7xl font-black text-black uppercase tracking-tighter leading-none mb-6 relative z-10">
                    {member.name}
                </h1>

                {/* GitHub link button */}
                <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white text-black px-5 py-3 rounded-full font-semibold text-sm hover:bg-zinc-200 transition-all group relative z-10"
                >
                    <FaGithub size={20} />
                    View on GitHub
                    <FaChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </div>
    );
};

export default Team;