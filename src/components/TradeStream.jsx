import React from 'react';
import { Fish, Waves, Clock } from 'lucide-react';

const WHALE_THRESHOLD = 50000;

export default function TradeStream({ trades }) {
    return (
        <div className="glass-card flex flex-col min-h-[300px] max-h-[600px] overflow-hidden shadow-2xl transition-all hover:border-white/20">
            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                        <Waves className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Trade Stream</h3>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                    <span>Live Feed</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-2">
                <div className="flex flex-col gap-1">
                    {trades.map((trade) => {
                        const isWhale = trade.value >= WHALE_THRESHOLD;

                        return (
                            <div
                                key={trade.id}
                                className={`flex items-center justify-between py-2 px-5 text-xs font-mono group transition-all duration-300 ${isWhale ? 'bg-blue-500/10 border-y border-blue-500/20 py-4' : 'hover:bg-white/5'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {isWhale && (
                                        <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-tighter">
                                            <Fish className="w-3 h-3 animate-bounce" />
                                            WHALE
                                        </div>
                                    )}
                                    <span className={`font-black ${trade.side === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                                        {trade.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                </div>

                                <div className="flex items-center gap-6">
                                    <span className="text-gray-400 font-medium">
                                        {trade.quantity.toFixed(4)}
                                    </span>
                                    <span className={`text-right min-w-[70px] ${isWhale ? 'text-blue-400 font-black' : 'text-gray-600 font-bold'}`}>
                                        ${(trade.value / 1000).toFixed(1)}k
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="p-3 border-t border-white/5 text-[9px] text-center text-gray-600 font-black uppercase tracking-widest bg-white/[0.01]">
                Threshold Detection: ${WHALE_THRESHOLD.toLocaleString()}
            </div>
        </div>
    );
}
