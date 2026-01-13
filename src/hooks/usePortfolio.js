import { useState, useEffect } from 'react';

export function usePortfolio(currentPrice, symbol) {
    // Initialize from localStorage or defaults
    const [portfolio, setPortfolio] = useState(() => {
        const saved = localStorage.getItem('crypto_portfolio');
        return saved ? JSON.parse(saved) : {
            balance: 100000, // $100,000 USDT starting capital
            positions: {}, // { btcusdt: { quantity: 0, avgPrice: 0 } }
            trades: []
        };
    });

    // Save to localStorage whenever portfolio changes
    useEffect(() => {
        localStorage.setItem('crypto_portfolio', JSON.stringify(portfolio));
    }, [portfolio]);

    const buy = (amountUSD) => {
        if (!currentPrice || amountUSD > portfolio.balance) return false;

        const quantity = amountUSD / currentPrice;
        setPortfolio(prev => {
            const pos = prev.positions[symbol] || { quantity: 0, avgPrice: 0 };
            const newQuantity = pos.quantity + quantity;
            const newAvgPrice = ((pos.quantity * pos.avgPrice) + (quantity * currentPrice)) / newQuantity;

            return {
                ...prev,
                balance: prev.balance - amountUSD,
                positions: {
                    ...prev.positions,
                    [symbol]: { quantity: newQuantity, avgPrice: newAvgPrice }
                },
                trades: [{
                    type: 'BUY',
                    symbol,
                    quantity,
                    price: currentPrice,
                    time: Date.now()
                }, ...prev.trades].slice(0, 50)
            };
        });
        return true;
    };

    const sell = (percent = 1) => {
        const pos = portfolio.positions[symbol];
        if (!pos || pos.quantity <= 0 || !currentPrice) return false;

        const sellQuantity = pos.quantity * percent;
        const gainUSD = sellQuantity * currentPrice;

        setPortfolio(prev => {
            const newQuantity = pos.quantity - sellQuantity;
            return {
                ...prev,
                balance: prev.balance + gainUSD,
                positions: {
                    ...prev.positions,
                    [symbol]: { ...pos, quantity: newQuantity }
                },
                trades: [{
                    type: 'SELL',
                    symbol,
                    quantity: sellQuantity,
                    price: currentPrice,
                    time: Date.now()
                }, ...prev.trades].slice(0, 50)
            };
        });
        return true;
    };

    const resetBalance = () => {
        setPortfolio({
            balance: 100000,
            positions: {},
            trades: []
        });
    };

    const currentPosition = portfolio.positions[symbol] || { quantity: 0, avgPrice: 0 };
    const positionValue = currentPosition.quantity * currentPrice;
    const pnlUSD = positionValue - (currentPosition.quantity * currentPosition.avgPrice);
    const pnlPercent = currentPosition.avgPrice > 0 ? (pnlUSD / (currentPosition.quantity * currentPosition.avgPrice)) * 100 : 0;

    return {
        balance: portfolio.balance,
        currentPosition,
        positionValue,
        pnlUSD,
        pnlPercent,
        trades: portfolio.trades,
        buy,
        sell,
        resetBalance
    };
}
