import { useState, useEffect, useCallback, useRef } from 'react';

const SYMBOLS = {
    btcusdt: { name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: '#f7931a' },
    ethusdt: { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627eea' },
    solusdt: { name: 'Solana', symbol: 'SOL', icon: '◎', color: '#00ffa3' },
    bnbusdt: { name: 'BNB', symbol: 'BNB', icon: '⬡', color: '#f3ba2f' },
    xrpusdt: { name: 'XRP', symbol: 'XRP', icon: '✕', color: '#00aae4' },
    adausdt: { name: 'Cardano', symbol: 'ADA', icon: '◆', color: '#0033ad' },
};

// 1. WebSocket Hook Enhanced for Trades
export function useWebSocket(symbol = 'btcusdt') {
    const [price, setPrice] = useState(null);
    const [priceHistory, setPriceHistory] = useState([]);
    const [trades, setTrades] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [priceDirection, setPriceDirection] = useState(null);
    const wsRef = useRef(null);
    const lastPriceRef = useRef(null);
    const mountedRef = useRef(true);

    const connect = useCallback(() => {
        if (wsRef.current) {
            wsRef.current.onopen = null;
            wsRef.current.onmessage = null;
            wsRef.current.onclose = null;
            wsRef.current.onerror = null;
            wsRef.current.close();
        }

        setPrice(null);
        setPriceHistory([]);
        setTrades([]);
        setIsConnected(false);

        const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@trade`;
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            if (mountedRef.current && wsRef.current === ws) setIsConnected(true);
        };

        ws.onmessage = (event) => {
            if (!mountedRef.current || wsRef.current !== ws) return;

            const data = JSON.parse(event.data);
            const newPrice = parseFloat(data.p);
            const quantity = parseFloat(data.q);
            const timestamp = data.T;
            const side = data.m ? 'sell' : 'buy';
            const value = newPrice * quantity;

            if (lastPriceRef.current !== null) {
                setPriceDirection(newPrice > lastPriceRef.current ? 'up' : newPrice < lastPriceRef.current ? 'down' : null);
            }
            lastPriceRef.current = newPrice;
            setPrice(newPrice);

            // Trade stream update
            setTrades(prev => [{
                id: data.t,
                price: newPrice,
                quantity,
                value,
                timestamp,
                side
            }, ...prev].slice(0, 30));

            setPriceHistory(prev => {
                const newHistory = [...prev, { time: Math.floor(timestamp / 1000), value: newPrice }];
                return newHistory.slice(-150);
            });
        };

        ws.onclose = () => {
            if (mountedRef.current && wsRef.current === ws) setIsConnected(false);
        };

        ws.onerror = () => {
            if (mountedRef.current && wsRef.current === ws) setIsConnected(false);
        };

        wsRef.current = ws;
    }, [symbol]);

    useEffect(() => {
        mountedRef.current = true;
        connect();
        return () => {
            mountedRef.current = false;
            if (wsRef.current) {
                wsRef.current.onopen = null;
                wsRef.current.onmessage = null;
                wsRef.current.onclose = null;
                wsRef.current.onerror = null;
                wsRef.current.close();
            }
        };
    }, [connect]);

    useEffect(() => {
        if (priceDirection) {
            const timer = setTimeout(() => setPriceDirection(null), 500);
            return () => clearTimeout(timer);
        }
    }, [priceDirection]);

    return {
        price,
        priceHistory,
        trades,
        isConnected,
        priceDirection,
        symbolInfo: SYMBOLS[symbol] || SYMBOLS.btcusdt
    };
}

// 2. Order Book Hook
export function useOrderBook(symbol = 'btcusdt') {
    const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
    const wsRef = useRef(null);

    useEffect(() => {
        const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@depth20@100ms`;
        const ws = new WebSocket(wsUrl);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setOrderBook({
                bids: data.b.map(b => ({ price: parseFloat(b[0]), quantity: parseFloat(b[1]) })),
                asks: data.a.map(a => ({ price: parseFloat(a[0]), quantity: parseFloat(a[1]) })),
            });
        };

        wsRef.current = ws;
        return () => ws.close();
    }, [symbol]);

    return orderBook;
}

// 3. Stats and Historical (Keep as is)
export function use24hStats(symbol = 'btcusdt') {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const fetchStats = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol.toUpperCase()}`);
                const data = await response.json();
                if (!cancelled) {
                    setStats({
                        high: parseFloat(data.highPrice),
                        low: parseFloat(data.lowPrice),
                        volume: parseFloat(data.volume),
                        priceChange: parseFloat(data.priceChange),
                        priceChangePercent: parseFloat(data.priceChangePercent),
                        lastPrice: parseFloat(data.lastPrice),
                    });
                }
            } catch (e) { console.error(e); } finally { if (!cancelled) setLoading(false); }
        };
        fetchStats();
        const interval = setInterval(fetchStats, 30000);
        return () => { cancelled = true; clearInterval(interval); };
    }, [symbol]);
    return { stats, loading };
}

export function useHistoricalData(symbol = 'btcusdt', interval = '1m', limit = 200) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=${limit}`);
                const klines = await response.json();
                if (!cancelled) {
                    const formatted = klines.map(k => ({
                        time: Math.floor(k[0] / 1000),
                        open: parseFloat(k[1]), high: parseFloat(k[2]), low: parseFloat(k[3]), close: parseFloat(k[4]),
                        value: parseFloat(k[4]),
                    }));
                    setData(formatted);
                }
            } catch (e) { console.error(e); } finally { if (!cancelled) setLoading(false); }
        };
        fetchData();
        return () => { cancelled = true; };
    }, [symbol, interval, limit]);
    return { data, loading };
}
