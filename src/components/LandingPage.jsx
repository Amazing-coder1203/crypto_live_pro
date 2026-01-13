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
            {/* Immersive Background Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-green-500/10 blur-[160px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/10 blur-[160px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
            </div>

            {/* Floating Header UI */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-10 px-10">
                <div className="w-full max-w-7xl flex items-center justify-between px-10 py-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl">
                    <div className="flex items-center gap-5 group cursor-pointer" onClick={() => navigate('/landing')}>
                        <motion.div whileHover={{ rotate: 15 }} className="relative">
                            <div className="absolute inset-0 bg-green-500 blur-xl opacity-20" />
                            <img src="./Crypto_live_pro.png" alt="Logo" className="w-12 h-12 rounded-xl relative z-10 border border-white/20" />
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black tracking-tighter leading-none">CRYPTOLIVE<span className="text-green-400">.PRO</span></span>
                            <span className="text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase mt-1">Institutional Terminal</span>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-12 text-sm font-black tracking-widest text-gray-500 uppercase">
                        <a href="#" className="hover:text-white hover:tracking-[0.5em] transition-all">Network</a>
                        <a href="#" className="hover:text-white hover:tracking-[0.5em] transition-all">Ecosystem</a>
                        <a href="#" className="hover:text-white hover:tracking-[0.5em] transition-all">Status</a>
                    </div>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="hidden sm:flex items-center gap-3 px-8 py-3 bg-white text-black font-black text-xs tracking-widest uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
                    >
                        Terminal Access
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </nav>

            <motion.main
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 flex-1 flex flex-col items-center justify-center px-10 pt-40 md:pt-48 pb-32 w-full max-w-7xl mx-auto"
            >
                {/* Animated Feature Badge */}
                <motion.div
                    variants={fadeInUp}
                    className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 mb-12 backdrop-blur-md shadow-2xl group cursor-default"
                >
                    <div className="relative">
                        <div className="w-3 h-3 rounded-full bg-green-400 animate-ping absolute inset-0" />
                        <div className="w-3 h-3 rounded-full bg-green-500 relative shadow-[0_0_10px_#22c55e]" />
                    </div>
                    <span className="text-[11px] font-black tracking-[0.4em] uppercase text-gray-400 group-hover:text-green-400 transition-colors">Algorithmic Node established // 4.2ms</span>
                </motion.div>

                {/* Hero Typography Section */}
                <motion.div variants={fadeInUp} className="text-center mb-16 max-w-5xl">
                    <h1 className="text-7xl md:text-9xl font-black leading-[0.85] tracking-[-0.06em] mb-10 select-none">
                        <span className="block text-white opacity-90 drop-shadow-2xl">EVOLVE BEYOND</span>
                        <span className="block text-gradient italic relative inline-block py-2">
                            MARKET NOISE
                            <motion.div
                                initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 1, duration: 2 }}
                                className="absolute bottom-4 left-0 h-1 bg-gradient-to-r from-green-400 to-transparent rounded-full opacity-50"
                            />
                        </span>
                    </h1>
                    <p className="text-gray-400 text-xl md:text-3xl font-medium leading-tight tracking-tight mb-16 opacity-80 max-w-4xl mx-auto px-4">
                        A high-frequency dashboard designed for the next generation of institutional traders. Zero lag. Infinite data. Total control.
                    </p>
                </motion.div>

                {/* Dynamic CTA Group */}
                <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-10 items-center justify-center w-full max-w-3xl">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="group relative w-full md:w-auto px-12 py-7 bg-white text-black font-black text-2xl rounded-3xl flex items-center justify-center gap-4 hover:scale-105 transition-all active:scale-95 shadow-[0_30px_100px_rgba(34,197,94,0.3)] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Zap className="w-7 h-7 fill-black group-hover:animate-bounce" />
                        <span className="relative">ENTER THE CORE</span>
                        <ArrowRight className="relative w-7 h-7 group-hover:translate-x-3 transition-transform duration-500" />
                    </button>

                    <button
                        className="w-full md:w-auto px-12 py-7 bg-white/5 backdrop-blur-3xl text-white font-black text-2xl rounded-3xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-4 group"
                    >
                        <Globe className="w-7 h-7 opacity-40 group-hover:rotate-180 transition-transform duration-1000" />
                        <span>GLOBAL FEED</span>
                    </button>
                </motion.div>

                {/* Grid Stats Container - Forced padding and alignment */}
                <motion.div
                    variants={fadeInUp}
                    className="mt-40 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"
                >
                    {[
                        { icon: Target, l: "Precision", d: "Sub-millisecond data synchronization.", c: "text-green-400" },
                        { icon: Activity, l: "Volume", d: "Live whale radar and order flow insight.", c: "text-blue-400" },
                        { icon: Shield, l: "Security", d: "End-to-end encrypted market streams.", c: "text-purple-400" },
                        { icon: MousePointer2, l: "UX Control", d: "Adaptive terminal for any screen size.", c: "text-orange-400" }
                    ].map((feature, i) => (
                        <div key={i} className="glass-panel p-10 glass-card-hover group border-white/5 hover:border-white/20">
                            <div className={`w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors ${feature.c}`}>
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tighter">{feature.l}</h3>
                            <p className="text-gray-500 font-bold leading-relaxed">{feature.d}</p>
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
