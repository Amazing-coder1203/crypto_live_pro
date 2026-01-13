import React from 'react';
import { Wallet, TrendingUp, TrendingDown, RotateCcw, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function PortfolioSim({ portfolio, symbolInfo }) {
    const { balance, currentPosition, positionValue, pnlUSD, pnlPercent, buy, sell, resetBalance } = portfolio;

    const isPositive = pnlUSD >= 0;

    return (
        <div className="glass-card flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Paper Trading</h3>
                </div>
                <button
                    onClick={resetBalance}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-gray-500 transition-colors"
                    title="Reset Balance"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
            </div>

            <div className="p-4 space-y-6">
                {/* Balance Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Total Balance</p>
                        <p className="text-xl font-mono font-bold text-white">${balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">{symbolInfo.symbol} Held</p>
                        <p className="text-xl font-mono font-bold text-white">{currentPosition.quantity.toFixed(4)}</p>
                    </div>
                </div>

                {/* PNL Stats */}
                <div className={`p-3 rounded-xl border ${isPositive ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Unrealized PNL</p>
                            <div className="flex items-center gap-2">
                                <span className={`text-xl font-mono font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                    {isPositive ? '+' : ''}${pnlUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </span>
                                <span className={`text-xs px-1.5 py-0.5 rounded ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {isPositive ? '+' : ''}{pnlPercent.toFixed(2)}%
                                </span>
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-400 font-mono">
                            Value: ${positionValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => buy(1000)}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 font-bold transition-all hover:scale-[1.02] active:scale-95"
                    >
                        <ArrowUpRight className="w-4 h-4" />
                        Buy $1k
                    </button>
                    <button
                        onClick={() => sell(1)}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold transition-all hover:scale-[1.02] active:scale-95 px-4"
                    >
                        <ArrowDownRight className="w-4 h-4" />
                        Sell All
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => buy(10000)}
                        className="text-[10px] py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 font-bold transition-all"
                    >
                        Buy $10k
                    </button>
                    <button
                        onClick={() => sell(0.5)}
                        className="text-[10px] py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 font-bold transition-all"
                    >
                        Sell 50%
                    </button>
                </div>
            </div>

            <div className="mt-auto p-4 bg-white/5 text-[10px] text-gray-500 flex justify-between items-center italic">
                <span>* Market simulation only. No real funds.</span>
                <span>Avg: ${currentPosition.avgPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
        </div>
    );
}
