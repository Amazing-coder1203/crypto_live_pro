import React from 'react';

export default function OrderBook({ data }) {
    const { bids, asks } = data;

    const maxVolume = Math.max(
        ...bids.map(b => b.quantity * b.price),
        ...asks.map(a => a.quantity * a.price)
    );

    const OrderRow = ({ price, quantity, type }) => {
        const volume = price * quantity;
        const barWidth = (volume / maxVolume) * 100;

        return (
            <div className="relative flex items-center justify-between py-0.5 px-2 text-[10px] md:text-xs font-mono group hover:bg-white/5 transition-colors">
                <div
                    className={`absolute inset-0 opacity-10 transition-all duration-500 ${type === 'bid' ? 'bg-green-500 right-0' : 'bg-red-500 left-0'}`}
                    style={{ width: `${barWidth}%`, [type === 'bid' ? 'right' : 'left']: 0 }}
                />
                <span className={`z-10 font-bold ${type === 'bid' ? 'text-green-400' : 'text-red-400'}`}>
                    {price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="z-10 text-gray-300">{quantity.toFixed(4)}</span>
                <span className="z-10 text-gray-500 hidden sm:inline">${(volume / 1000).toFixed(1)}k</span>
            </div>
        );
    };

    return (
        <div className="glass-card flex flex-col h-[400px] overflow-hidden">
            <div className="p-3 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Order Book</h3>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-500">Depth 20</span>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Asks (Sells) - we show them in descending order to put highest at top */}
                <div className="flex-1 flex flex-col-reverse justify-start overflow-hidden py-1">
                    {asks.slice(0, 15).reverse().map((ask, i) => (
                        <OrderRow key={`ask-${i}`} price={ask.price} quantity={ask.quantity} type="ask" />
                    ))}
                </div>

                {/* Spread */}
                <div className="py-2 bg-white/5 border-y border-white/10 flex items-center justify-center">
                    {asks[0] && bids[0] ? (
                        <div className="text-xs font-bold text-gray-400 font-mono">
                            Spread: {((asks[0].price - bids[0].price)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                    ) : null}
                </div>

                {/* Bids (Buys) */}
                <div className="flex-1 flex flex-col justify-start overflow-hidden py-1">
                    {bids.slice(0, 15).map((bid, i) => (
                        <OrderRow key={`bid-${i}`} price={bid.price} quantity={bid.quantity} type="bid" />
                    ))}
                </div>
            </div>
        </div>
    );
}
