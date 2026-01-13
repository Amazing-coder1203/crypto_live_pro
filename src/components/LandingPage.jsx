import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Shield, Zap, Globe, Cpu } from 'lucide-react';

export default function LandingPage({ onExplore }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-dark-900 selection:bg-green-500/30">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-6xl w-full z-10 flex flex-col items-center text-center"
            >
                {/* Logo Section */}
                <motion.div variants={itemVariants} className="mb-8 relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-dark-900/50 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-3xl">
                        <img
                            src="./Crypto_live_pro.png"
                            alt="CryptoLive Pro"
                            className="w-24 h-24 md:w-32 md:h-32 object-contain"
                        />
                    </div>
                </motion.div>

                {/* Hero Text */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-8xl font-black mb-6 tracking-tighter"
                >
                    <span className="bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">REAL-TIME</span>
                    <br />
                    <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent italic">CRYPTO INTELLIGENCE</span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 font-medium leading-relaxed"
                >
                    Experience the pulse of the market with our high-frequency terminal. Live order books, whale tracking, and professional-grade analytics at your fingertips.
                </motion.p>

                {/* Action Buttons */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mb-20">
                    <button
                        onClick={onExplore}
                        className="group relative px-8 py-4 bg-white text-black font-black text-lg rounded-2xl flex items-center gap-2 hover:scale-105 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        EXPLORE DASHBOARD
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                        className="px-8 py-4 bg-white/5 backdrop-blur-md text-white font-bold text-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                        VIEW REPOSITORY
                        <Globe className="w-5 h-5 opacity-50" />
                    </button>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full border-t border-white/5 pt-20"
                >
                    {[
                        { icon: Zap, label: "Live Streams", desc: "WebSocket Speed" },
                        { icon: BarChart3, label: "Analytics", desc: "Pro Indicators" },
                        { icon: Cpu, label: "Simulator", desc: "No-Risk Trading" },
                        { icon: Shield, label: "Secure", desc: "Privacy First" }
                    ].map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                                <feature.icon className="w-6 h-6 text-green-400" />
                            </div>
                            <h3 className="text-white font-bold mb-1">{feature.label}</h3>
                            <p className="text-gray-500 text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Footer Decoration */}
            <footer className="mt-20 text-gray-600 text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">
                Engineered for High-Frequency Precision v3.0
            </footer>
        </div>
    );
}
