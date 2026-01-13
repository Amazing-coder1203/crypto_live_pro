import React from 'react';
import { Wallet, TrendingUp, TrendingDown, RotateCcw, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function PortfolioSim({ portfolio, symbolInfo }) {
    const { balance, currentPosition, positionValue, pnlUSD, pnlPercent, buy, sell, resetBalance } = portfolio;

    const isPositive = pnlUSD >= 0;

    return (
        <div className="glass-card flex flex-col h-full overflow-hidden shadow-2xl transition-all hover:border-white/20">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                        <Wallet className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Trading Simulation</h3>
                </div>
                <button
                    onClick={resetBalance}
                    className="p-2 hover:bg-white/10 rounded-xl text-gray-500 transition-all hover:text-white"
                    title="Reset Balance"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
            </div>

            <div className="p-8 space-y-8">
                {/* Balance Stats */}
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-1">
                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Available USDT</p>
                        <p className="text-2xl font-black font-mono text-white tracking-tighter">${balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{symbolInfo.symbol} Inventory</p>
                        <p className="text-2xl font-black font-mono text-white tracking-tighter">{currentPosition.quantity.toFixed(4)}</p>
                    </div>
                </div>

                {/* PNL Stats */}
                <div className={`p-6 rounded-2xl border transition-all duration-500 ${isPositive ? 'bg-green-500/10 border-green-500/20 glow-green' : 'bg-red-500/10 border-red-500/20 glow-red'}`}>
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Unrealized Performance</p>
                            <div className="flex items-center gap-4">
                                <span className={`text-3xl font-black font-mono tracking-tighter ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                    {isPositive ? '+' : ''}${Math.abs(pnlUSD).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded-lg font-black ${isPositive ? 'bg-green-500/30 text-green-400' : 'bg-red-500/30 text-red-400'}`}>
                                    {isPositive ? '+' : ''}{pnlPercent.toFixed(2)}%
                                </span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-full transition-colors ${isPositive ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                            {isPositive ? <TrendingUp className="w-8 h-8 text-green-400" /> : <TrendingDown className="w-8 h-8 text-red-400" />}
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Position Value</span>
                        <span className="text-xs font-black font-mono text-gray-400">${positionValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                </div>

                {/* Action Controls */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => buy(1000)}
                        className="flex flex-col items-center justify-center gap-1 py-4 rounded-2xl bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 transition-all hover:scale-[1.02] active:scale-95 group"
                    >
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest">Buy $1k</span>
                    </button>
                    <button
                        onClick={() => sell(1)}
                        className="flex flex-col items-center justify-center gap-1 py-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-all hover:scale-[1.02] active:scale-95 group"
                    >
                        <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest">Sell All</span>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => buy(10000)}
                        className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                    >
                        Deploy $10k
                    </button>
                    <button
                        onClick={() => sell(0.5)}
                        className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                    >
                        Liquidate 50%
                    </button>
                </div>
            </div>

            <div className="mt-auto p-4 bg-white/[0.03] flex justify-between items-center text-[10px] font-black text-gray-600 uppercase tracking-widest px-8">
                <span>Risk: Simulator Mode</span>
                <span>Avg Entry: ${currentPosition.avgPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
        </div>
    );
}
