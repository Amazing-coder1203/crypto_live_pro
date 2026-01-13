import { useState } from 'react';
import { Activity, LayoutDashboard, Wallet, ChevronRight } from 'lucide-react';
import { useWebSocket, use24hStats, useHistoricalData, useOrderBook } from './hooks/useCrypto';
import { usePortfolio } from './hooks/usePortfolio';
import CryptoSelector from './components/CryptoSelector';
import PriceDisplay from './components/PriceDisplay';
import StatsHeader from './components/StatsHeader';
import PriceChart from './components/PriceChart';
import OrderBook from './components/OrderBook';
import TradeStream from './components/TradeStream';
import PortfolioSim from './components/PortfolioSim';
import LandingPage from './components/LandingPage';
import { motion, AnimatePresence } from 'framer-motion';

const SYMBOL_INFO = {
    btcusdt: { name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: '#f7931a' },
    ethusdt: { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627eea' },
    solusdt: { name: 'Solana', symbol: 'SOL', icon: '◎', color: '#00ffa3' },
    bnbusdt: { name: 'BNB', symbol: 'BNB', icon: '⬡', color: '#f3ba2f' },
    xrpusdt: { name: 'XRP', symbol: 'XRP', icon: '✕', color: '#00aae4' },
    adausdt: { name: 'Cardano', symbol: 'ADA', icon: '◆', color: '#0033ad' },
};

function App() {
    const [showDashboard, setShowDashboard] = useState(false);
    const [selectedSymbol, setSelectedSymbol] = useState('btcusdt');
    const [activeTab, setActiveTab] = useState('market');

    const { price, priceHistory, trades, isConnected, priceDirection } = useWebSocket(selectedSymbol);
    const { stats, loading: statsLoading } = use24hStats(selectedSymbol);
    const { data: historicalData, loading: historyLoading } = useHistoricalData(selectedSymbol, '1m', 200);
    const orderBookData = useOrderBook(selectedSymbol);
    const portfolio = usePortfolio(price, selectedSymbol);

    const symbolInfo = SYMBOL_INFO[selectedSymbol];

    return (
        <AnimatePresence mode="wait">
            {!showDashboard ? (
                <motion.div
                    key="landing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8 }}
                >
                    <LandingPage onExplore={() => setShowDashboard(true)} />
                </motion.div>
            ) : (
                <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center w-full min-h-screen bg-dark-900"
                >
                    <div className="w-full max-w-[1700px] px-6 py-10 md:px-12 space-y-8 md:space-y-12">

                        {/* Top Navigation / Header */}
                        <header className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-8 border-b border-white/5">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="flex items-center gap-5">
                                    <div className="relative group cursor-pointer" onClick={() => setShowDashboard(false)}>
                                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                                        <div className="relative p-1 rounded-2xl bg-dark-900 border border-white/10 shadow-2xl overflow-hidden transition-transform group-hover:scale-110">
                                            <img
                                                src="./Crypto_live_pro.png"
                                                alt="Logo"
                                                className="w-14 h-14 object-cover rounded-xl"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-black bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent tracking-tighter hover:to-white transition-all cursor-default">
                                            CRYPTOLIVE<span className="text-green-400">.PRO</span>
                                        </h1>
                                        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                                            <div className="w-2 h-2 rounded-full bg-green-500 pulse-live"></div>
                                            Terminal Active
                                        </div>
                                    </div>
                                </div>

                                {/* Tab Switcher */}
                                <nav className="flex items-center bg-white/5 p-1.5 rounded-2xl border border-white/10">
                                    <button
                                        onClick={() => setActiveTab('market')}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'market' ? 'bg-white/10 text-white shadow-2xl' : 'text-gray-500 hover:text-gray-300'}`}
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        Market
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('trading')}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'trading' ? 'bg-white/10 text-white shadow-2xl' : 'text-gray-500 hover:text-gray-300'}`}
                                    >
                                        <Wallet className="w-4 h-4" />
                                        Trading
                                    </button>
                                </nav>
                            </div>

                            <div className="flex items-center gap-6 w-full lg:w-auto">
                                <CryptoSelector
                                    selectedSymbol={selectedSymbol}
                                    onSymbolChange={setSelectedSymbol}
                                    isConnected={isConnected}
                                />
                            </div>
                        </header>

                        {/* Content Spacing improved with Gap-10 */}
                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

                            {/* Main Analysis Area (Left & Middle) */}
                            <div className="xl:col-span-9 space-y-10">
                                {/* Visual hierarchy boost for stats */}
                                <StatsHeader stats={stats} loading={statsLoading} symbolInfo={symbolInfo} />

                                <PriceDisplay
                                    price={price}
                                    priceDirection={priceDirection}
                                    symbolInfo={symbolInfo}
                                    stats={stats}
                                />

                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-b from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                                    <PriceChart
                                        historicalData={historicalData}
                                        liveData={priceHistory}
                                        loading={historyLoading}
                                    />
                                </div>

                                {/* Mobile/Tablet Adaptive Panels */}
                                <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <OrderBook data={orderBookData} />
                                    <TradeStream trades={trades} />
                                </div>
                                <div className="xl:hidden">
                                    <PortfolioSim portfolio={portfolio} symbolInfo={symbolInfo} />
                                </div>
                            </div>

                            {/* Sidebar (Desktop) */}
                            <div className="hidden xl:flex xl:col-span-3 flex-col gap-8">
                                <div className="sticky top-10 space-y-8">
                                    <PortfolioSim portfolio={portfolio} symbolInfo={symbolInfo} />
                                    <OrderBook data={orderBookData} />
                                    <TradeStream trades={trades} />
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <footer className="pt-20 pb-12 border-t border-white/5 mt-10">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-10 opacity-40 hover:opacity-100 transition-opacity">
                                <div className="flex items-center gap-3 text-gray-400 text-xs font-mono tracking-wider">
                                    <Activity className="w-5 h-5 text-green-400 pulse-live" />
                                    <span>SUBSYSTEM_NODE_ACTIVE // BINANCE_STREAM_v4</span>
                                </div>
                                <div className="flex flex-wrap justify-center gap-8 text-[11px] uppercase font-black tracking-[0.2em] text-gray-500">
                                    <span className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500"></div> Latency: 42ms</span>
                                    <span className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500"></div> Engine: Vite/React</span>
                                    <span className="flex items-center gap-2"><div className="w-1 h-1 bg-white"></div> CryptoLive Pro Terminal</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default App;
