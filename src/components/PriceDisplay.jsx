import { TrendingUp, TrendingDown } from 'lucide-react';

export default function PriceDisplay({ price, priceDirection, symbolInfo, stats }) {
    const formatPrice = (p) => {
        if (!p) return '--';
        return p.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const isPositive = stats?.priceChangePercent >= 0;

    return (
        <div className="glass-card p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 group relative overflow-hidden">
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-10 pointer-events-none transition-colors duration-1000 ${priceDirection === 'up' ? 'bg-green-500' : priceDirection === 'down' ? 'bg-red-500' : 'bg-blue-500'
                }`} />

            {/* Main Price Info */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 z-10 w-full lg:w-auto">
                <div
                    className="text-6xl md:text-8xl font-black drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                    style={{ color: symbolInfo?.color || '#00ff88' }}
                >
                    {symbolInfo?.icon || '₿'}
                </div>

                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="flex items-center gap-6">
                        <span
                            className={`text-5xl sm:text-7xl md:text-8xl font-black font-mono tracking-tighter transition-all duration-300 ${priceDirection === 'up' ? 'text-green-400' : priceDirection === 'down' ? 'text-red-400' : 'text-white'
                                } ${priceDirection ? (priceDirection === 'up' ? 'flash-up' : 'flash-down') : ''}`}
                        >
                            ${formatPrice(price)}
                        </span>

                        <div className={`transition-all duration-500 hidden sm:block ${priceDirection ? 'opacity-100 scale-125 translate-y-0' : 'opacity-0 scale-50 translate-y-4'}`}>
                            {priceDirection === 'up' && <TrendingUp className="w-16 h-16 text-green-400" />}
                            {priceDirection === 'down' && <TrendingDown className="w-16 h-16 text-red-400" />}
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                        <span className="text-gray-400 text-lg font-bold tracking-widest uppercase mb-1">
                            {symbolInfo?.name || 'Bitcoin'}
                        </span>
                        <div className="h-px w-8 bg-white/10"></div>
                        <span className="text-gray-600 font-mono text-lg font-bold">USDT_SPOT</span>
                    </div>
                </div>
            </div>

            {/* 24h Summary Badge */}
            {stats && (
                <div className="flex flex-col items-center lg:items-end gap-3 z-10">
                    <div
                        className={`flex items-center gap-3 px-8 py-4 rounded-3xl font-mono font-black text-xl shadow-2xl transition-all duration-500 hover:scale-110 ${isPositive
                                ? 'bg-green-500/10 text-green-400 border border-green-500/30 glow-green'
                                : 'bg-red-500/10 text-red-400 border border-red-500/30 glow-red'
                            }`}
                    >
                        {isPositive ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                        <span>{isPositive ? '+' : ''}{stats.priceChangePercent.toFixed(2)}%</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-black tracking-[.2em] uppercase">Market Pulse (24H)</p>
                </div>
            )}
        </div>
    );
}
