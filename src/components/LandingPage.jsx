import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, BarChart3, Shield, Zap, Globe, Cpu, ChevronRight, Activity } from 'lucide-react';

export default function LandingPage({ onExplore }) {
    const containerRef = useRef(null);

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
        <div ref={containerRef} className="relative min-h-screen bg-[#030305] overflow-hidden flex flex-col items-center">
            {/* Dynamic Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-green-500/10 blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/10 blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full animate-float" />
            </div>

            {/* Navigation Backdrop */}
            <nav className="z-50 w-full max-w-7xl px-8 flex items-center justify-between py-8">
                <div className="flex items-center gap-3">
                    <img src="./Crypto_live_pro.png" alt="Logo" className="w-10 h-10 rounded-xl" />
                    <span className="text-xl font-bold tracking-tighter">CRYPTOLIVE<span className="text-green-400">.PRO</span></span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
                    <a href="#" className="hover:text-white transition-colors">Markets</a>
                    <a href="#" className="hover:text-white transition-colors">Technology</a>
                    <a href="#" className="hover:text-white transition-colors">Legal</a>
                </div>
            </nav>

            <motion.main
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 w-full max-w-7xl pb-20"
            >
                {/* Badge */}
                <motion.div
                    variants={fadeInUp}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
                >
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-black tracking-widest uppercase text-gray-400">v3.0 Live Subsystem Active</span>
                </motion.div>

                {/* Hero Title */}
                <motion.div variants={fadeInUp} className="text-center mb-8 relative">
                    <h1 className="text-6xl md:text-9xl font-black leading-[0.9] tracking-[ -0.05em] mb-4">
                        <span className="block text-white opacity-90">UNLEASH THE</span>
                        <span className="block text-gradient italic">ALGORITHMIC</span>
                        <span className="block text-white">ADVANTAGE</span>
                    </h1>
                </motion.div>

                <motion.p
                    variants={fadeInUp}
                    className="text-gray-400 text-lg md:text-2xl max-w-3xl text-center font-medium leading-relaxed mb-12 px-4"
                >
                    Navigate the digital asset landscape with millisecond precision. Our professional-grade terminal connects you directly to the heartbeat of the blockchain.
                </motion.p>

                {/* Main CTA */}
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 items-center">
                    <button
                        onClick={onExplore}
                        className="group relative px-10 py-5 bg-white text-black font-black text-xl rounded-2xl flex items-center gap-3 hover:scale-105 transition-all active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.2)] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative">INITIALIZE TERMINAL</span>
                        <ChevronRight className="relative w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                        className="px-10 py-5 bg-white/5 backdrop-blur-xl text-white font-bold text-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-3"
                    >
                        <span>GITHUB REPO</span>
                        <Globe className="w-5 h-5 opacity-40" />
                    </button>
                </motion.div>

                {/* Floating Feature Preview */}
                <motion.div
                    variants={fadeInUp}
                    className="mt-32 w-full grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {[
                        {
                            icon: Activity,
                            title: "Whale Radar",
                            desc: "Deep-sea liquidity monitoring for large institutional orders.",
                            color: "bg-blue-500/20 text-blue-400"
                        },
                        {
                            icon: BarChart3,
                            title: "Proprietary Alpha",
                            desc: "Custom technical indicators optimized for high-volatility pairs.",
                            color: "bg-green-500/20 text-green-400"
                        },
                        {
                            icon: Cpu,
                            title: "Neural Engine",
                            desc: "Predictive price modeling and real-time spread analysis.",
                            color: "bg-purple-500/20 text-purple-400"
                        }
                    ].map((feature, i) => (
                        <div key={i} className="glass-panel p-8 glass-card-hover group">
                            <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-black mb-3 text-white">{feature.title}</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </motion.main>

            {/* Cinematic Grid Base */}
            <div className="fixed bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent z-0 opacity-50 transition-opacity" />
            <div className="fixed inset-x-0 bottom-0 h-px bg-white/10 z-10" />
            <div className="fixed bottom-10 left-10 flex items-center gap-4 text-[10px] font-black tracking-[0.4em] text-gray-700 uppercase">
                <div className="w-12 h-px bg-gray-800" />
                SECURE_LINK_ENCRYPTED
            </div>
        </div>
    );
}
