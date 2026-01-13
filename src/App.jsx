import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {
    Activity, LayoutDashboard, Wallet, LogOut, Terminal,
    Layers, Search, Bell, Menu, X, Settings
} from 'lucide-react';
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

function TerminalApp() {
    const navigate = useNavigate();
    const [selectedSymbol, setSelectedSymbol] = useState('btcusdt');
    const [activeTab, setActiveTab] = useState('market');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { price, priceHistory, trades, isConnected, priceDirection } = useWebSocket(selectedSymbol);
    const { stats, loading: statsLoading } = use24hStats(selectedSymbol);
    const { data: historicalData, loading: historyLoading } = useHistoricalData(selectedSymbol, '1m', 200);
    const orderBookData = useOrderBook(selectedSymbol);
    const portfolio = usePortfolio(price, selectedSymbol);

    const symbolInfo = SYMBOL_INFO[selectedSymbol];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-screen bg-[#030305] text-white overflow-hidden"
        >
            {/* Dynamic Sidebar - Professional Distribution */}
            <aside className="hidden lg:flex flex-col w-24 border-r border-white/5 items-center justify-between py-10 bg-[#050508] z-50">
                <div className="flex flex-col items-center gap-12">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="p-1 rounded-2xl bg-white/5 border border-white/10 shadow-2xl cursor-pointer mb-4"
                        onClick={() => navigate('/landing')}
                    >
                        <img src="./Crypto_live_pro.png" alt="Logo" className="w-12 h-12 object-cover rounded-xl" />
                    </motion.div>

                    <div className="flex flex-col gap-8">
                        {[
                            { icon: LayoutDashboard, id: 'market' },
                            { icon: Terminal, id: 'terminal' },
                            { icon: Wallet, id: 'trading' },
                            { icon: Layers, id: 'layers' },
                            { icon: Bell, id: 'notifications' }
                        ].map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => (item.id === 'market' || item.id === 'trading') && setActiveTab(item.id)}
                                className={`p-4 rounded-2xl transition-all relative group ${activeTab === item.id ? 'bg-green-500/10 text-green-400' : 'text-gray-500 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon className="w-6 h-6" />
                                {activeTab === item.id && (
                                    <motion.div layoutId="active-pill" className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-1 h-8 bg-green-400 rounded-r-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <button className="p-4 text-gray-500 hover:text-white transition-all"><Settings className="w-6 h-6" /></button>
                    <button
                        onClick={() => navigate('/landing')}
                        className="p-4 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                    >
                        <LogOut className="w-6 h-6" />
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Top Header - Using Flex Between and Proper Centering */}
                <header className="h-24 border-b border-white/5 flex items-center justify-between px-10 md:px-16 container mx-auto bg-[#050508]/40 backdrop-blur-3xl z-40">
                    <div className="flex items-center gap-8">
                        <button
                            className="lg:hidden p-3 rounded-xl bg-white/5 text-gray-400"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>

                        <div className="flex flex-col">
                            <h1 className="text-2xl font-black tracking-tighter flex items-center gap-2">
                                <span className="text-white">TERMINAL</span>
                                <span className="text-green-500 opacity-80">CORE</span>
                            </h1>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Latency: 24ms</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 max-w-2xl mx-12 hidden md:block">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <Search className="w-4 h-4 text-gray-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Query market data or enter command (Ctrl + K)..."
                                className="w-full bg-white/5 border border-white/10 h-14 pl-14 pr-10 rounded-2xl text-sm transition-all focus:bg-white/[0.08] focus:border-green-500/50 focus:ring-0 placeholder:text-gray-600 font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <CryptoSelector
                            selectedSymbol={selectedSymbol}
                            onSymbolChange={setSelectedSymbol}
                            isConnected={isConnected}
                        />
                    </div>
                </header>

                {/* Global Layout Wrapper - Centered with max-width */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-[#030305] py-16 px-6 md:px-16 lg:px-24">
                    <div className="max-w-[1600px] mx-auto space-y-16">

                        {/* Stats - Full Width with Proper Spacing */}
                        <StatsHeader stats={stats} loading={statsLoading} symbolInfo={symbolInfo} />

                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-20 items-start">

                            {/* Left Wing: Price & Charts */}
                            <div className="xl:col-span-8 space-y-16">
                                <PriceDisplay
                                    price={price}
                                    priceDirection={priceDirection}
                                    symbolInfo={symbolInfo}
                                    stats={stats}
                                />

                                <div className="dashboard-card overflow-hidden">
                                    <PriceChart
                                        historicalData={historicalData}
                                        liveData={priceHistory}
                                        loading={historyLoading}
                                    />
                                </div>

                                {/* Mobile Secondary Data */}
                                <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <OrderBook data={orderBookData} />
                                    <TradeStream trades={trades} />
                                </div>
                            </div>

                            {/* Right Wing: Trading & Depth */}
                            <div className="xl:col-span-4 flex flex-col gap-12 lg:gap-16">
                                <div className="sticky top-10 space-y-12 lg:space-y-16">
                                    <PortfolioSim portfolio={portfolio} symbolInfo={symbolInfo} />
                                    <OrderBook data={orderBookData} />
                                    <TradeStream trades={trades} />
                                </div>
                            </div>

                        </div>

                        {/* Status Footer - Professional Spacing */}
                        <footer className="pt-24 pb-16 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10">
                                    <Activity className="w-4 h-4 text-green-400" />
                                    <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Binance_Cloud_Link: ACTIVE</span>
                                </div>
                                <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10">
                                    <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Engine: Antigravity-v3</span>
                                </div>
                            </div>

                            <div className="flex gap-12 text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
                                <span className="hover:text-white transition-colors cursor-pointer">Security Protocol</span>
                                <span className="hover:text-white transition-colors cursor-pointer">API Documentation</span>
                                <span className="hover:text-white transition-colors cursor-pointer">© 2026 CRYPTOLIVE PRO</span>
                            </div>
                        </footer>
                    </div>
                </main>
            </div>

            {/* Mobile Slide-over Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
                        />
                        <motion.div
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#050508] border-r border-white/10 z-[70] p-10 flex flex-col gap-12"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <img src="./Crypto_live_pro.png" alt="Logo" className="w-12 h-12 rounded-xl" />
                                <span className="text-xl font-bold tracking-tighter">TERMINAL.DASH</span>
                            </div>
                            <div className="flex flex-col gap-4">
                                {[
                                    { icon: LayoutDashboard, label: 'Markets', id: 'market' },
                                    { icon: Wallet, label: 'Trading', id: 'trading' },
                                    { icon: Bell, label: 'Alerts' },
                                    { icon: Settings, label: 'Settings' }
                                ].map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            if (item.id) setActiveTab(item.id);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex items-center gap-5 p-5 rounded-2xl hover:bg-white/5 text-gray-400 hover:text-white transition-all text-left"
                                    >
                                        <item.icon className="w-6 h-6" />
                                        <span className="font-bold">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => navigate('/landing')}
                                className="mt-auto flex items-center gap-5 p-5 bg-red-500/10 text-red-500 rounded-2xl font-bold"
                            >
                                <LogOut className="w-6 h-6" />
                                Exit Terminal
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function App() {
    return (
        <Router basename="/crypto_live_pro">
            <Routes>
                <Route path="/landing" element={<LandingPage onExplore={() => { }} />} />
                <Route path="/dashboard" element={<TerminalApp />} />
                <Route path="/" element={<Navigate to="/landing" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
