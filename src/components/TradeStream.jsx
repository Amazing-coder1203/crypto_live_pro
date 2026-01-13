import React from 'react';
import { Fish, Waves, Clock } from 'lucide-react';

const WHALE_THRESHOLD = 50000; // $50,000 USD is a "whale" for this stream

export default function TradeStream({ trades }) {
    return (
        <div className="glass-card flex flex-col h-[400px] overflow-hidden">
            <div className="p-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-blue-400" />
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Live Trades</h3>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>Real-time</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-1">
                <div className="flex flex-col gap-0.5">
                    {trades.map((trade) => {
                        const isWhale = trade.value >= WHALE_THRESHOLD;

                        return (
                            <div
                                key={trade.id}
                                className={`flex items-center justify-between py-1 px-3 text-[11px] font-mono group transition-all duration-300 ${isWhale ? 'bg-blue-500/10 border-y border-blue-500/20 py-2' : 'hover:bg-white/5'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    {isWhale && <Fish className="w-3 h-3 text-blue-400 animate-pulse" />}
                                    <span className={trade.side === 'buy' ? 'text-green-400' : 'text-red-400'}>
                                        {trade.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-gray-400">
                                        {trade.quantity.toFixed(4)}
                                    </span>
                                    <span className={`text-right min-w-[60px] ${isWhale ? 'text-blue-400 font-bold' : 'text-gray-600'}`}>
                                        ${(trade.value / 1000).toFixed(1)}k
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="p-2 border-t border-white/5 text-[10px] text-center text-gray-600">
                Whale threshold: ${WHALE_THRESHOLD.toLocaleString()}
            </div>
        </div>
    );
}
