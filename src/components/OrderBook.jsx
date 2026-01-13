import React from 'react';

export default function OrderBook({ data }) {
    const { bids, asks } = data;

    const maxVolume = Math.max(
        ...bids.map(b => b.quantity * b.price),
        ...asks.map(a => a.quantity * a.price),
        1 // Prevents division by zero
    );

    const OrderRow = ({ price, quantity, type }) => {
        const volume = price * quantity;
        const barWidth = (volume / maxVolume) * 100;

        return (
            <div className="relative flex items-center justify-between py-1 px-4 text-xs font-mono group hover:bg-white/5 transition-colors cursor-default">
                <div
                    className={`absolute inset-0 opacity-10 transition-all duration-700 ${type === 'bid' ? 'bg-green-500 right-0' : 'bg-red-500 left-0'}`}
                    style={{ width: `${Math.min(barWidth, 100)}%`, [type === 'bid' ? 'right' : 'left']: 0 }}
                />
                <span className={`z-10 font-bold tracking-tight ${type === 'bid' ? 'text-green-400' : 'text-red-400'}`}>
                    {price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="z-10 text-gray-300 font-medium">{quantity.toFixed(4)}</span>
                <span className="z-10 text-gray-600 hidden sm:inline text-[10px] uppercase font-black">${(volume / 1000).toFixed(1)}k</span>
            </div>
        );
    };

    return (
        <div className="glass-card flex flex-col min-h-[300px] max-h-[600px] overflow-hidden shadow-2xl transition-all hover:border-white/20">
            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Market Depth</h3>
                <span className="text-[9px] bg-white/10 px-2 py-1 rounded-full text-gray-400 font-bold uppercase tracking-wider">Depth 20</span>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Asks (Sells) */}
                <div className="flex-1 flex flex-col-reverse justify-start overflow-hidden py-2">
                    {asks.slice(0, 15).reverse().map((ask, i) => (
                        <OrderRow key={`ask-${i}`} price={ask.price} quantity={ask.quantity} type="ask" />
                    ))}
                </div>

                {/* Spread */}
                <div className="py-3 bg-white/5 border-y border-white/10 flex flex-col items-center justify-center gap-1">
                    {asks[0] && bids[0] ? (
                        <>
                            <div className="text-sm font-black text-white font-mono tracking-tight">
                                {((asks[0].price + bids[0].price) / 2).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </div>
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                Spread: {((asks[0].price - bids[0].price)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </div>
                        </>
                    ) : null}
                </div>

                {/* Bids (Buys) */}
                <div className="flex-1 flex flex-col justify-start overflow-hidden py-2">
                    {bids.slice(0, 15).map((bid, i) => (
                        <OrderRow key={`bid-${i}`} price={bid.price} quantity={bid.quantity} type="bid" />
                    ))}
                </div>
            </div>
        </div>
    );
}
