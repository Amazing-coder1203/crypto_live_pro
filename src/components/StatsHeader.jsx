import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3 } from 'lucide-react';

export default function StatsHeader({ stats, loading, symbolInfo }) {
    if (loading || !stats) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="glass-card p-4">
                        <div className="shimmer h-4 w-20 rounded mb-2"></div>
                        <div className="shimmer h-8 w-32 rounded"></div>
                    </div>
                ))}
            </div>
        );
    }

    const isPositive = stats.priceChangePercent >= 0;

    const statItems = [
        {
            label: '24h High',
            value: `$${stats.high.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            icon: TrendingUp,
            color: 'text-green-400',
        },
        {
            label: '24h Low',
            value: `$${stats.low.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            icon: TrendingDown,
            color: 'text-red-400',
        },
        {
            label: '24h Change',
            value: `${isPositive ? '+' : ''}${stats.priceChangePercent.toFixed(2)}%`,
            icon: Activity,
            color: isPositive ? 'text-green-400' : 'text-red-400',
            highlight: true,
        },
        {
            label: '24h Volume',
            value: `${(stats.volume).toLocaleString(undefined, { maximumFractionDigits: 0 })} ${symbolInfo?.symbol || 'BTC'}`,
            icon: BarChart3,
            color: 'text-blue-400',
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statItems.map((item, index) => (
                <div
                    key={index}
                    className={`glass-card p-4 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 ${item.highlight ? (isPositive ? 'glow-green' : 'glow-red') : ''
                        }`}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                        <span className="text-sm text-gray-400">{item.label}</span>
                    </div>
                    <p className={`text-xl font-semibold font-mono ${item.color}`}>
                        {item.value}
                    </p>
                </div>
            ))}
        </div>
    );
}
