import { useState } from 'react';
import { Activity, Zap, LayoutDashboard, BarChart3, TrendingUp, Wallet } from 'lucide-react';
import { useWebSocket, use24hStats, useHistoricalData, useOrderBook } from './hooks/useCrypto';
import { usePortfolio } from './hooks/usePortfolio';
import CryptoSelector from './components/CryptoSelector';
import PriceDisplay from './components/PriceDisplay';
import StatsHeader from './components/StatsHeader';
import PriceChart from './components/PriceChart';
import OrderBook from './components/OrderBook';
import TradeStream from './components/TradeStream';
import PortfolioSim from './components/PortfolioSim';

const SYMBOL_INFO = {
    btcusdt: { name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: '#f7931a' },
    ethusdt: { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627eea' },
    solusdt: { name: 'Solana', symbol: 'SOL', icon: '◎', color: '#00ffa3' },
    bnbusdt: { name: 'BNB', symbol: 'BNB', icon: '⬡', color: '#f3ba2f' },
    xrpusdt: { name: 'XRP', symbol: 'XRP', icon: '✕', color: '#00aae4' },
    adausdt: { name: 'Cardano', symbol: 'ADA', icon: '◆', color: '#0033ad' },
};

function App() {
    const [selectedSymbol, setSelectedSymbol] = useState('btcusdt');
    const [activeTab, setActiveTab] = useState('market'); // 'market' | 'trading'

    const { price, priceHistory, trades, isConnected, priceDirection } = useWebSocket(selectedSymbol);
    const { stats, loading: statsLoading } = use24hStats(selectedSymbol);
    const { data: historicalData, loading: historyLoading } = useHistoricalData(selectedSymbol, '1m', 200);
    const orderBookData = useOrderBook(selectedSymbol);
    const portfolio = usePortfolio(price, selectedSymbol);

    const symbolInfo = SYMBOL_INFO[selectedSymbol];

    return (
        <div className="flex flex-col items-center w-full min-h-screen">
            <div className="w-full max-w-[1600px] px-4 py-6 md:px-8 space-y-6">
                {/* Top Navigation / Header */}
                <header className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-white/10 shadow-lg">
                                <Zap className="w-7 h-7 text-green-400" />
                            </div>
                            <h1 className="text-2xl font-black bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent tracking-tighter">
                                CRYPTOLIVE.PRO
                            </h1>
                        </div>

                        {/* Desktop Tab Switcher */}
                        <nav className="hidden md:flex items-center bg-white/5 p-1 rounded-xl border border-white/5">
                            <button
                                onClick={() => setActiveTab('market')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'market' ? 'bg-white/10 text-white shadow-xl' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Market
                            </button>
                            <button
                                onClick={() => setActiveTab('trading')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'trading' ? 'bg-white/10 text-white shadow-xl' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <Wallet className="w-4 h-4" />
                                Paper Trade
                            </button>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto no-scrollbar">
                        <CryptoSelector
                            selectedSymbol={selectedSymbol}
                            onSymbolChange={setSelectedSymbol}
                            isConnected={isConnected}
                        />
                    </div>
                </header>

                {/* Global Stats Bar */}
                <StatsHeader stats={stats} loading={statsLoading} symbolInfo={symbolInfo} />

                {/* Main Workspace Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                    {/* Left Column: Price & Chart (Main Area) */}
                    <div className="xl:col-span-3 space-y-6">
                        <PriceDisplay
                            price={price}
                            priceDirection={priceDirection}
                            symbolInfo={symbolInfo}
                            stats={stats}
                        />

                        <PriceChart
                            historicalData={historicalData}
                            liveData={priceHistory}
                            loading={historyLoading}
                        />

                        {/* Mobile Tab View for Info Panels */}
                        <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
                            <OrderBook data={orderBookData} />
                            <TradeStream trades={trades} />
                        </div>

                        <div className="xl:hidden">
                            <PortfolioSim portfolio={portfolio} symbolInfo={symbolInfo} />
                        </div>
                    </div>

                    {/* Right Column: Order Book, Trades & Portfolio (Desktop Sidebar) */}
                    <div className="hidden xl:flex flex-col gap-6">
                        <PortfolioSim portfolio={portfolio} symbolInfo={symbolInfo} />
                        <OrderBook data={orderBookData} />
                        <TradeStream trades={trades} />
                    </div>

                </div>

                {/* Footer */}
                <footer className="pt-12 pb-8 border-t border-white/5">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 opacity-50 transition-opacity hover:opacity-100">
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-mono">
                            <Activity className="w-4 h-4 text-green-400 pulse-live" />
                            <span>BINANCE_DIRECT_STREAM_V3_CONNECTED</span>
                        </div>
                        <div className="flex gap-6 text-[10px] uppercase font-black tracking-widest text-gray-500">
                            <span>Latency: 100ms</span>
                            <span>Updates: 1s</span>
                            <span>Built with Antigravity AI</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;
