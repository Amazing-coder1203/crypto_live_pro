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
import Background3D from './components/Background3D';
import AutoTrader from './components/AutoTrader';
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
            className="relative flex min-h-screen bg-[#030305] text-white overflow-hidden"
        >
            {/* Dynamic Sidebar - Professional Distribution */}
            {/* Dynamic Sidebar - Professional Distribution */}


            <div
                className="flex-1 flex flex-col min-h-screen"
                style={{ paddingTop: 'var(--header-height)' }}
            >
                {/* Top Header - Using Flex Between and Proper Centering */}
                <header className="fixed top-0 left-0 right-0 h-[var(--header-height)] border-b border-white/5 bg-[#050508]/40 backdrop-blur-3xl z-40 transition-all duration-300">
                    <div className="h-full w-full max-w-[1400px] mx-auto flex items-center justify-center gap-8 lg:gap-10 px-6">
                        <div className="flex items-center gap-6">
                            <button
                                className="lg:hidden p-3 rounded-xl bg-white/5 text-gray-400"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X /> : <Menu />}
                            </button>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-[0_0_30px_-5px_rgba(0,255,136,0.15)] cursor-pointer group relative shrink-0"
                                onClick={() => navigate('/landing')}
                            >
                                <div className="absolute inset-0 bg-green-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <img src="./Crypto_live_pro.png" alt="Logo" className="w-8 h-8 object-cover rounded-lg relative z-10" />
                            </motion.div>

                            <div className="flex flex-col gap-1">
                                <h1 className="text-2xl font-black tracking-tighter flex items-center gap-3">
                                    <span className="text-white tracking-tight">TERMINAL</span>
                                    <span className="text-green-500 opacity-90">CORE</span>
                                </h1>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Latency: 24ms</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-[500px] hidden md:block">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <Search className="w-5 h-5 text-gray-500 group-focus-within:text-green-500 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Query market data or enter command (Ctrl + K)..."
                                    className="w-full bg-white/5 border border-white/10 h-14 px-12 rounded-2xl text-sm transition-all focus:bg-white/[0.08] focus:border-green-500/50 focus:ring-0 placeholder:text-gray-600 font-medium tracking-wide text-center"
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
                    </div>
                </header>

                {/* Global Layout Wrapper - Centered with max-width */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-[#030305]">
                    <div className="terminal-scale w-full px-[20px] py-[clamp(2rem,3vw,4rem)]">
                        <div className="w-full space-y-[clamp(2rem,3vw,5rem)]">

                            {/* Stats - Full Width with Proper Spacing */}
                            <StatsHeader stats={stats} loading={statsLoading} symbolInfo={symbolInfo} />

                            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-[clamp(2rem,3vw,5rem)] items-start">

                                {/* Left Wing: Price & Charts */}
                                <div className="space-y-[clamp(2rem,3vw,5rem)]">
                                    <PriceDisplay
                                        price={price}
                                        priceDirection={priceDirection}
                                        symbolInfo={symbolInfo}
                                        stats={stats}
                                    />

                                    <div className="dashboard-card overflow-hidden scale-[var(--chart-scale)] origin-top-left transition-transform duration-500">
                                        <PriceChart
                                            historicalData={historicalData}
                                            liveData={priceHistory}
                                            loading={historyLoading}
                                        />
                                    </div>

                                    {/* Mobile Secondary Data - Keeps structure for small screens if needed, though they are flex-col-1 */}
                                    <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <OrderBook data={orderBookData} />
                                        <TradeStream trades={trades} />
                                    </div>
                                </div>

                                {/* Middle Wing: Trading & Depth */}
                                <div className="flex flex-col gap-12 lg:gap-16">
                                    <div className="sticky top-10 space-y-6 lg:space-y-8">
                                        <PortfolioSim portfolio={portfolio} symbolInfo={symbolInfo} />
                                        <AutoTrader
                                            currentPrice={price}
                                            symbol={symbolInfo?.symbol}
                                            onBuy={portfolio.buy}
                                            onSell={portfolio.sell}
                                        />
                                        <OrderBook data={orderBookData} />
                                    </div>
                                </div>

                                {/* Far Right Wing: Trade Stream */}
                                <div className="flex flex-col gap-12 lg:gap-16 hidden xl:flex">
                                    <div className="sticky top-10 space-y-6 lg:space-y-8">
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
        </motion.div >
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
