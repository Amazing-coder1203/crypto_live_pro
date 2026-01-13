import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, CrosshairMode, LineSeries, CandlestickSeries } from 'lightweight-charts';

// Hepler to calculate SMA
const calculateSMA = (data, period) => {
    const sma = [];
    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) continue;

        let sum = 0;
        for (let j = 0; j < period; j++) {
            sum += (data[i - j].close || data[i - j].value);
        }
        sma.push({ time: data[i].time, value: sum / period });
    }
    return sma;
};

export default function PriceChart({ historicalData, liveData, loading }) {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);
    const smaRef = useRef(null);

    const [chartType, setChartType] = useState('line'); // 'line' | 'candlestick'
    const [showSMA, setShowSMA] = useState(true);

    // Initialize chart
    useEffect(() => {
        if (!chartContainerRef.current) return;

        if (chartRef.current) {
            chartRef.current.remove();
            chartRef.current = null;
            seriesRef.current = null;
        }

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: '#d1d5db',
                fontFamily: "'Inter', system-ui, sans-serif",
            },
            grid: {
                vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
                horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
            },
            crosshair: {
                mode: CrosshairMode.Normal,
                vertLine: {
                    color: 'rgba(255, 255, 255, 0.3)',
                    labelBackgroundColor: '#1a1a25',
                },
                horzLine: {
                    color: 'rgba(255, 255, 255, 0.3)',
                    labelBackgroundColor: '#1a1a25',
                },
            },
            rightPriceScale: {
                borderColor: 'rgba(255, 255, 255, 0.1)',
                scaleMargins: { top: 0.1, bottom: 0.1 },
            },
            timeScale: {
                borderColor: 'rgba(255, 255, 255, 0.1)',
                timeVisible: true,
                secondsVisible: false,
            },
            handleScroll: { vertTouchDrag: false },
        });

        let series;
        if (chartType === 'candlestick') {
            series = chart.addSeries(CandlestickSeries, {
                upColor: '#00ff88',
                downColor: '#ff4757',
                borderUpColor: '#00ff88',
                borderDownColor: '#ff4757',
                wickUpColor: '#00ff88',
                wickDownColor: '#ff4757',
            });
        } else {
            series = chart.addSeries(LineSeries, {
                color: '#00ff88',
                lineWidth: 2,
                crosshairMarkerVisible: true,
                priceLineColor: '#00ff88',
            });
        }

        // Add SMA Series
        const smaSeries = chart.addSeries(LineSeries, {
            color: '#8b5cf6', // purple
            lineWidth: 1,
            priceLineVisible: false,
            crosshairMarkerVisible: false,
        });

        chartRef.current = chart;
        seriesRef.current = series;
        smaRef.current = smaSeries;

        chart.timeScale().fitContent();

        const handleResize = () => {
            if (chartContainerRef.current && chartRef.current) {
                chartRef.current.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                    height: chartContainerRef.current.clientHeight,
                });
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
                seriesRef.current = null;
                smaRef.current = null;
            }
        };
    }, [chartType]);

    // Update SMA Visibility
    useEffect(() => {
        if (smaRef.current) {
            smaRef.current.applyOptions({ visible: showSMA });
        }
    }, [showSMA]);

    // Update data
    useEffect(() => {
        if (!seriesRef.current || historicalData.length === 0) return;

        try {
            if (chartType === 'candlestick') {
                seriesRef.current.setData(historicalData);
            } else {
                const lineData = historicalData.map(d => ({ time: d.time, value: d.close || d.value }));
                seriesRef.current.setData(lineData);
            }

            // Calculate and set SMA
            if (historicalData.length >= 20) {
                const smaData = calculateSMA(historicalData, 20);
                smaRef.current.setData(smaData);
            }

            if (chartRef.current) {
                chartRef.current.timeScale().fitContent();
            }
        } catch (error) {
            console.error('Error setting chart data:', error);
        }
    }, [historicalData, chartType]);

    // Live update
    useEffect(() => {
        if (!seriesRef.current || liveData.length === 0) return;

        const latestPoint = liveData[liveData.length - 1];
        if (latestPoint && chartType === 'line') {
            try {
                seriesRef.current.update({ time: latestPoint.time, value: latestPoint.value });
            } catch (error) { }
        }
    }, [liveData, chartType]);

    return (
        <div className="glass-card p-4 relative flex flex-col gap-4">
            {/* Chart Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mr-2">Market Chart</h3>
                    <button
                        onClick={() => setChartType('line')}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${chartType === 'line' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-gray-500 hover:bg-white/10'
                            }`}
                    >
                        Line
                    </button>
                    <button
                        onClick={() => setChartType('candlestick')}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${chartType === 'candlestick' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-gray-500 hover:bg-white/10'
                            }`}
                    >
                        Candle
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Indicators:</span>
                    <button
                        onClick={() => setShowSMA(!showSMA)}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${showSMA ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-white/5 text-gray-500'
                            }`}
                    >
                        SMA 20
                    </button>
                </div>
            </div>

            <div className="relative">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-xl z-20">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-gray-300 text-sm">Loading market history...</span>
                        </div>
                    </div>
                )}
                <div ref={chartContainerRef} className="chart-container w-full h-[400px] md:h-[500px]" />
            </div>
        </div>
    );
}
