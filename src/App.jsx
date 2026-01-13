import { useState, useEffect } from 'react';
import { Activity, LayoutDashboard, Wallet, LogOut, Terminal, Layers, Search, Bell } from 'lucide-react';
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
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(15px)" }}
                    transition={{ duration: 0.8 }}
                >
                    <LandingPage onExplore={() => setShowDashboard(true)} />
                </motion.div>
            ) : (
                <motion.div
                    key="dashboard"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex min-h-screen bg-[#030305]"
                >
                    {/* Sidebar Navigation */}
                    <aside className="hidden lg:flex flex-col w-20 border-r border-white/5 items-center py-8 gap-10 bg-[#050508]">
                        <div className="p-1 rounded-xl bg-white/5 border border-white/10 hover:scale-110 transition-transform cursor-pointer" onClick={() => setShowDashboard(false)}>
                            <img src="./Crypto_live_pro.png" alt="Logo" className="w-10 h-10 object-cover rounded-lg" />
                        </div>
                        <div className="flex flex-col gap-6">
                            {[LayoutDashboard, Terminal, Layers, Wallet, Bell].map((Icon, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => idx === 0 ? setActiveTab('market') : idx === 3 ? setActiveTab('trading') : null}
                                    className={`p-3 rounded-xl transition-all ${idx === 0 && activeTab === 'market' ? 'bg-primary/20 text-primary' : idx === 3 && activeTab === 'trading' ? 'bg-primary/20 text-primary' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                                >
                                    <Icon className="w-6 h-6" />
                                </button>
                            ))}
                        </div>
                        <div className="mt-auto">
                            <button
                                onClick={() => setShowDashboard(false)}
                                className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                            >
                                <LogOut className="w-6 h-6" />
                            </button>
                        </div>
                    </aside>

                    <div className="flex-1 flex flex-col h-screen overflow-hidden">
                        {/* Top Bar */}
                        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#050508]/80 backdrop-blur-xl z-50">
                            <div className="flex items-center gap-6">
                                <div className="lg:hidden p-1 rounded-lg bg-white/5 mr-2">
                                    <img src="./Crypto_live_pro.png" alt="Logo" className="w-8 h-8 rounded-lg" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-black tracking-tighter text-white">
                                        TERMINAL<span className="text-green-400">.DASH</span>
                                    </h1>
                                    <p className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase">System Status: Optimal</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="hidden md:flex items-center bg-white/5 h-12 px-4 rounded-xl border border-white/10 gap-3 min-w-[300px]">
                                    <Search className="w-4 h-4 text-gray-500" />
                                    <input type="text" placeholder="Search markets or commands..." className="bg-transparent border-none text-sm focus:ring-0 text-white w-full placeholder:text-gray-600" />
                                </div>
                                <CryptoSelector
                                    selectedSymbol={selectedSymbol}
                                    onSymbolChange={setSelectedSymbol}
                                    isConnected={isConnected}
                                />
                            </div>
                        </header>

                        {/* Scrollable Workspace */}
                        <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-[#030305]">
                            {/* Centralizing Wrapper with significant horizontal breathing room */}
                            <div className="w-full h-full flex flex-col items-center">
                                <div className="w-full max-w-[1400px] px-8 md:px-12 lg:px-20 py-16 md:py-24 space-y-12 lg:space-y-16">

                                    <StatsHeader stats={stats} loading={statsLoading} symbolInfo={symbolInfo} />

                                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-16">
                                        <div className="xl:col-span-12">
                                            <PriceDisplay
                                                price={price}
                                                priceDirection={priceDirection}
                                                symbolInfo={symbolInfo}
                                                stats={stats}
                                            />
                                        </div>

                                        <div className="xl:col-span-8 space-y-12 lg:space-y-16">
                                            <PriceChart
                                                historicalData={historicalData}
                                                liveData={priceHistory}
                                                loading={historyLoading}
                                            />

                                            <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-10">
                                                <OrderBook data={orderBookData} />
                                                <TradeStream trades={trades} />
                                            </div>
                                        </div>

                                        <div className="hidden xl:flex xl:col-span-4 flex-col gap-12 lg:gap-16">
                                            <PortfolioSim portfolio={portfolio} symbolInfo={symbolInfo} />
                                            <OrderBook data={orderBookData} />
                                            <TradeStream trades={trades} />
                                        </div>
                                    </div>

                                    <footer className="pt-24 pb-16 border-t border-white/5 opacity-50 flex flex-col md:flex-row items-center justify-between gap-10">
                                        <div className="flex items-center gap-4 text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">
                                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                                            CONNECTION_ENCRYPTED_v3
                                        </div>
                                        <div className="flex flex-wrap justify-center gap-10">
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Latency: 28ms</span>
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Binance Cloud API v4</span>
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">© 2026 CryptoLive Pro</span>
                                        </div>
                                    </footer>
                                </div>
                            </div>
                        </main>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default App;
