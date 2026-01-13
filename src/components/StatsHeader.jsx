import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';

export default function StatsHeader({ stats, loading, symbolInfo }) {
    if (loading || !stats) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="glass-card p-6">
                        <div className="shimmer h-4 w-20 rounded mb-3"></div>
                        <div className="shimmer h-10 w-40 rounded"></div>
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statItems.map((item, index) => (
                <div
                    key={index}
                    className={`glass-card p-6 transition-all duration-500 hover:scale-[1.05] hover:border-white/30 group ${item.highlight ? (isPositive ? 'glow-green' : 'glow-red') : ''
                        }`}
                >
                    <div className="flex items-center gap-3 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                        <div className={`p-2 rounded-lg bg-white/5 ${item.color}`}>
                            <item.icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-gray-400">{item.label}</span>
                    </div>
                    <p className={`text-2xl font-black font-mono tracking-tight ${item.color}`}>
                        {item.value}
                    </p>
                </div>
            ))}
        </div>
    );
}
