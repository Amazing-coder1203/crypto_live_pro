import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight, BarChart3, Globe, Cpu, ChevronRight, Activity,
    Target, Zap, Shield, MousePointer2
} from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const fadeInUp = {
        hidden: { y: 60, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <div className="relative min-h-screen bg-[#030305] text-white overflow-hidden flex flex-col">
            {/* Visual Focus Mask - Replaces Starry Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

            {/* Floating Header UI */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-8 px-4 md:px-6">
                <div className="w-full max-w-[95%] md:max-w-7xl flex items-center justify-between px-6 md:px-10 py-5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl transition-all duration-300 hover:bg-white/[0.05]">
                    <div className="flex items-center gap-5 group cursor-pointer" onClick={() => navigate('/landing')}>
                        <motion.div whileHover={{ rotate: 20 }} className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-green-500 blur-2xl opacity-30" />
                            <img src="./Crypto_live_pro.png" alt="Logo" className="w-12 h-12 rounded-2xl relative z-10 border border-white/20 shadow-lg" />
                        </motion.div>
                        <div className="flex flex-col justify-center">
                            <span className="text-xl font-black tracking-tighter leading-none flex items-center text-white">
                                CRYPTOLIVE<span className="text-green-400">.PRO</span>
                            </span>
                            <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase mt-1 group-hover:text-green-400 transition-colors">
                                Institutional Terminal
                            </span>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-12 text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                        {['Network', 'Ecosystem', 'Status'].map((item) => (
                            <a key={item} href="#" className="hover:text-white hover:tracking-[0.3em] transition-all duration-300 relative group">
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="hidden sm:flex items-center gap-3 px-8 py-3 bg-white text-black font-black text-[11px] tracking-widest uppercase rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_10px_40px_rgba(34,197,94,0.4)]"
                    >
                        Terminal Access
                        <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </nav>

            <motion.main
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 md:px-10 pt-44 pb-32 w-full text-center"
            >
                {/* Animated Feature Badge */}
                <motion.div
                    variants={fadeInUp}
                    className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 mb-20 backdrop-blur-xl shadow-2xl hover:border-green-500/30 transition-colors cursor-default"
                >
                    <div className="relative flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-ping absolute" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 relative shadow-[0_0_15px_#22c55e]" />
                    </div>
                    <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-gray-400">
                        Algorithmic Node established <span className="text-green-400 ml-2">// 4.2ms</span>
                    </span>
                </motion.div>

                {/* Hero Typography Section */}
                <motion.div
                    variants={fadeInUp}
                    className="w-full max-w-7xl mx-auto mb-24 relative px-6 flex flex-col items-center"
                >
                    {/* Subtle Radial Mask for text focus */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)] -z-10 blur-3xl" />

                    <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.95] tracking-[-0.03em] mb-12 select-none">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-2xl">EVOLVE BEYOND</span>
                        <span className="block text-gradient italic relative inline-block py-2">
                            MARKET NOISE
                            <motion.div
                                initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ delay: 0.5, duration: 2 }}
                                className="absolute bottom-6 left-0 h-2 bg-gradient-to-r from-green-400 to-transparent rounded-full opacity-60 mix-blend-screen"
                            />
                        </span>
                    </h1>
                    <p className="text-gray-400 text-xl md:text-2xl font-medium leading-relaxed tracking-wide opacity-80 max-w-4xl lg:max-w-5xl mx-auto px-4">
                        A high-frequency dashboard designed for the next generation of institutional traders. <br className="hidden md:block" />
                        <span className="text-white">Zero lag. Infinite data. Total control.</span>
                    </p>
                </motion.div>

                {/* Dynamic CTA Group */}
                <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-2xl mb-40 mx-auto">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="group relative w-full md:w-auto px-12 py-6 bg-white text-black font-black text-xl rounded-2xl flex items-center justify-center gap-4 hover:scale-105 transition-all active:scale-95 shadow-[0_20px_80px_rgba(34,197,94,0.2)] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/40 to-blue-400/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Zap className="w-6 h-6 fill-black group-hover:animate-bounce" />
                        <span className="relative tracking-wider">ENTER THE CORE</span>
                        <ArrowRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </button>

                    <button
                        className="w-full md:w-auto px-12 py-6 bg-white/5 backdrop-blur-3xl text-white font-black text-xl rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-4 group"
                    >
                        <Globe className="w-6 h-6 opacity-50 group-hover:rotate-180 transition-transform duration-700" />
                        <span className="tracking-wider">GLOBAL FEED</span>
                    </button>
                </motion.div>

                {/* Grid Stats Container - Wide Layout */}
                <motion.div
                    variants={fadeInUp}
                    className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4"
                >
                    {[
                        { icon: Target, l: "Precision", d: "Sub-millisecond synchronization.", c: "text-green-400", b: "border-green-500/20" },
                        { icon: Activity, l: "Volume", d: "Live whale radar & order flow.", c: "text-blue-400", b: "border-blue-500/20" },
                        { icon: Shield, l: "Security", d: "End-to-end encrypted streams.", c: "text-purple-400", b: "border-purple-500/20" },
                        { icon: MousePointer2, l: "UX Control", d: "Adaptive terminal interface.", c: "text-orange-400", b: "border-orange-500/20" }
                    ].map((feature, i) => (
                        <div key={i} className={`glass-panel p-10 glass-card-hover group border border-white/5 hover:${feature.b} bg-gradient-to-b from-white/[0.02] to-transparent hover:from-white/[0.05] transition-all duration-500 flex flex-col items-center text-center`}>
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-white/5 group-hover:scale-110 transition-transform duration-300 ${feature.c}`}>
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tighter">{feature.l}</h3>
                            <p className="text-gray-500 text-sm font-bold leading-relaxed group-hover:text-gray-400 transition-colors">{feature.d}</p>
                        </div>
                    ))}
                </motion.div>
            </motion.main>

            {/* Cinematic Perspective Floor */}
            <footer className="mt-auto px-10 pb-16 flex flex-col md:flex-row items-center justify-between gap-10 border-t border-white/5 pt-16 w-full max-w-7xl mx-auto">
                <div className="flex items-center gap-6 opacity-30">
                    <div className="w-12 h-px bg-white" />
                    <span className="text-[10px] font-black tracking-[0.5em] uppercase">Built for Performance</span>
                </div>
                <div className="flex items-center gap-12 text-[10px] font-black tracking-[0.3em] uppercase text-gray-700">
                    <span className="hover:text-white transition-colors">Privacy Policy</span>
                    <span className="hover:text-white transition-colors">License Agreement</span>
                    <span className="text-gray-500">© 2026 CRYPTOLIVE PRO</span>
                </div>
            </footer>
        </div>
    );
}
