import { ChevronDown, Wifi, WifiOff } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const SYMBOLS = [
    { id: 'btcusdt', name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: '#f7931a' },
    { id: 'ethusdt', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627eea' },
    { id: 'solusdt', name: 'Solana', symbol: 'SOL', icon: '◎', color: '#00ffa3' },
    { id: 'bnbusdt', name: 'BNB', symbol: 'BNB', icon: '⬡', color: '#f3ba2f' },
    { id: 'xrpusdt', name: 'XRP', symbol: 'XRP', icon: '✕', color: '#00aae4' },
    { id: 'adausdt', name: 'Cardano', symbol: 'ADA', icon: '◆', color: '#0033ad' },
];

export default function CryptoSelector({ selectedSymbol, onSymbolChange, isConnected }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selected = SYMBOLS.find(s => s.id === selectedSymbol) || SYMBOLS[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="glass-card px-4 py-3 flex items-center gap-3 hover:border-white/20 transition-all duration-200 group w-full md:min-w-[240px]"
            >
                {/* Crypto Icon */}
                <span
                    className="text-2xl font-bold"
                    style={{ color: selected.color }}
                >
                    {selected.icon}
                </span>

                {/* Info */}
                <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{selected.symbol}</span>
                        <span className="text-gray-500 text-sm">/USDT</span>
                    </div>
                    <span className="text-xs text-gray-400">{selected.name}</span>
                </div>

                {/* Connection Status */}
                <div className="flex items-center gap-2">
                    {isConnected ? (
                        <Wifi className="w-4 h-4 text-green-400 pulse-live" />
                    ) : (
                        <WifiOff className="w-4 h-4 text-red-400" />
                    )}
                    <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                            }`}
                    />
                </div>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 glass-card overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {SYMBOLS.map((crypto) => (
                        <button
                            key={crypto.id}
                            onClick={() => {
                                onSymbolChange(crypto.id);
                                setIsOpen(false);
                            }}
                            className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors duration-150 ${crypto.id === selectedSymbol ? 'bg-white/10' : ''
                                }`}
                        >
                            <span
                                className="text-xl font-bold"
                                style={{ color: crypto.color }}
                            >
                                {crypto.icon}
                            </span>
                            <div className="flex-1 text-left">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-white">{crypto.symbol}</span>
                                    <span className="text-gray-500 text-sm">/USDT</span>
                                </div>
                                <span className="text-xs text-gray-400">{crypto.name}</span>
                            </div>
                            {crypto.id === selectedSymbol && (
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
