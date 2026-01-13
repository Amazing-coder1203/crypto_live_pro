import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

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
        <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Main Price */}
            <div className="flex items-center gap-4">
                <span
                    className="text-4xl md:text-5xl font-bold"
                    style={{ color: symbolInfo?.color || '#00ff88' }}
                >
                    {symbolInfo?.icon || '₿'}
                </span>
                <div>
                    <div className="flex items-center gap-3">
                        <span
                            className={`text-3xl sm:text-4xl md:text-5xl font-bold font-mono transition-colors duration-300 ${priceDirection === 'up'
                                ? 'text-green-400'
                                : priceDirection === 'down'
                                    ? 'text-red-400'
                                    : 'text-white'
                                } ${priceDirection ? (priceDirection === 'up' ? 'flash-up' : 'flash-down') : ''}`}
                        >
                            ${formatPrice(price)}
                        </span>

                        {/* Direction Indicator */}
                        <div className={`transition-all duration-300 ${priceDirection ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                            {priceDirection === 'up' && (
                                <TrendingUp className="w-8 h-8 text-green-400" />
                            )}
                            {priceDirection === 'down' && (
                                <TrendingDown className="w-8 h-8 text-red-400" />
                            )}
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                        {symbolInfo?.name || 'Bitcoin'} / USDT
                    </p>
                </div>
            </div>

            {/* 24h Change Badge */}
            {stats && (
                <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-semibold ${isPositive
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                >
                    {isPositive ? (
                        <TrendingUp className="w-4 h-4" />
                    ) : (
                        <TrendingDown className="w-4 h-4" />
                    )}
                    <span>
                        {isPositive ? '+' : ''}
                        {stats.priceChangePercent.toFixed(2)}%
                    </span>
                </div>
            )}
        </div>
    );
}
