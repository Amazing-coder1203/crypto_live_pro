import React, { useState, useEffect, useRef } from 'react';
import { Target, Zap, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AutoTrader({ currentPrice, onBuy, onSell, symbol }) {
    const [lotSize, setLotSize] = useState(() => {
        const saved = localStorage.getItem('auto_trader_lots');
        return saved ? parseFloat(saved) : 0.1;
    });
    const [targetPrice, setTargetPrice] = useState(() => {
        const saved = localStorage.getItem('auto_trader_target');
        return saved ? parseFloat(saved) : 0;
    });
    const [isActive, setIsActive] = useState(() => {
        const saved = localStorage.getItem('auto_trader_active');
        return saved === 'true';
    });
    const [lastAction, setLastAction] = useState(null);

    // Persist state to localStorage
    useEffect(() => {
        localStorage.setItem('auto_trader_lots', lotSize);
        localStorage.setItem('auto_trader_target', targetPrice);
        localStorage.setItem('auto_trader_active', isActive);
    }, [lotSize, targetPrice, isActive]);

    // Initialize target price when current price is first available AND not already set
    useEffect(() => {
        if (currentPrice && targetPrice === 0 && !localStorage.getItem('auto_trader_target')) {
            setTargetPrice(currentPrice * 1.05); // Default to 5% gain
        }
    }, [currentPrice]);

    // Auto-sell logic
    useEffect(() => {
        if (isActive && currentPrice && targetPrice > 0) {
            if (currentPrice >= targetPrice) {
                // Trigger Sell All
                onSell(1); // 1.0 = 100%
                setIsActive(false);
                setLastAction(`Sold all at $${currentPrice.toLocaleString()}`);

                // Reset after 3 seconds
                setTimeout(() => setLastAction(null), 3000);
            }
        }
    }, [currentPrice, targetPrice, isActive, onSell]);

    const handleExecute = () => {
        const costUSD = lotSize * currentPrice;
        const success = onBuy(costUSD); // Returns true/false from usePortfolio

        if (success) {
            setIsActive(true);
            setLastAction(`Bought ${lotSize} ${symbol} @ $${currentPrice.toLocaleString()}`);
            setTimeout(() => setLastAction(null), 3000);
        } else {
            setLastAction('Insufficient funds');
            setTimeout(() => setLastAction(null), 3000);
        }
    };

    const adjustLots = (delta) => {
        setLotSize(prev => Math.max(0.0001, parseFloat((prev + delta).toFixed(4))));
    };

    return (
        <div className="glass-card p-6 border border-white/5 relative overflow-hidden group">
            {/* Background Glow */}
            <div className={`absolute inset-0 opacity-10 blur-2xl transition-all duration-500 ${isActive ? 'bg-purple-500' : 'bg-blue-500'}`} />

            <div className="relative z-10 flex flex-col gap-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Zap className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-blue-400'}`} />
                        <span className="text-xs font-black uppercase tracking-widest text-gray-300">Auto-Trade Strategy</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-700'}`} />
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-4">

                    {/* Lot Size Input */}
                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Buy Lots ({symbol})</label>
                        <div className="relative flex items-center">
                            <input
                                type="number"
                                value={lotSize}
                                disabled={isActive}
                                onChange={(e) => setLotSize(parseFloat(e.target.value))}
                                className={`w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-sm font-mono font-bold text-white outline-none transition-all ${isActive ? 'opacity-50 cursor-not-allowed' : 'focus:border-blue-500/50'}`}
                            />
                            <div className="absolute right-1 flex flex-col gap-0.5 pointer-events-none">
                                <ChevronUp className="w-3 h-3 text-gray-500" />
                                <ChevronDown className="w-3 h-3 text-gray-500" />
                            </div>
                            {/* Invisible click targets for arrows could be better but sticking to native or custom buttons */}
                            <div className="absolute right-0 inset-y-0 flex flex-col w-8 border-l border-white/5">
                                <button
                                    onClick={() => !isActive && adjustLots(0.1)}
                                    disabled={isActive}
                                    className={`flex-1 flex items-center justify-center text-gray-400 ${isActive ? 'cursor-not-allowed' : 'hover:bg-white/10 hover:text-white'}`}
                                >
                                    <ChevronUp className="w-3 h-3" />
                                </button>
                                <button
                                    onClick={() => !isActive && adjustLots(-0.1)}
                                    disabled={isActive}
                                    className={`flex-1 flex items-center justify-center text-gray-400 ${isActive ? 'cursor-not-allowed' : 'hover:bg-white/10 hover:text-white'}`}
                                >
                                    <ChevronDown className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Target Price Input */}
                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Take Profit At ($)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={targetPrice}
                                disabled={isActive}
                                onChange={(e) => setTargetPrice(parseFloat(e.target.value))}
                                className={`w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-sm font-mono font-bold text-white outline-none transition-all ${isActive ? 'opacity-50 cursor-not-allowed' : 'focus:border-purple-500/50'}`}
                            />
                            <Target className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                    </div>
                </div>

                {/* Action Button Stack */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleExecute}
                        disabled={isActive}
                        className={`relative w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs overflow-hidden transition-all duration-300
                            ${isActive
                                ? 'bg-gray-800 text-gray-400 cursor-not-allowed border border-white/5'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] border border-white/10'
                            }
                        `}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {isActive ? (
                                <>
                                    <TrendingUp className="w-4 h-4 animate-bounce" />
                                    Active: Monitoring Price...
                                </>
                            ) : (
                                <>
                                    <Zap className="w-4 h-4" />
                                    Execute & <br /> Arm Profit Take
                                </>
                            )}
                        </span>
                    </button>

                    {isActive && (
                        <button
                            onClick={() => {
                                setIsActive(false);
                                setLastAction('Monitoring cancelled');
                                setTimeout(() => setLastAction(null), 3000);
                            }}
                            className="w-full py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 transition-all"
                        >
                            Cancel Strategy
                        </button>
                    )}
                </div>
                <br />

                {/* Notification Area */}
                <AnimatePresence>
                    {lastAction && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-4 left-0 right-0 text-center"
                        >
                            <span className="text-[10px] font-bold text-green-400 bg-black/80 px-3 py-1 rounded-full border border-green-500/30">
                                {lastAction}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
