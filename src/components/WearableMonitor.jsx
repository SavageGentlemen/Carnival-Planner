import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Activity, Bluetooth, BluetoothOff, Shield, ShieldAlert, ShieldCheck, X, AlertTriangle } from 'lucide-react';
import { HeartRateMonitor, SafetyMonitor, isWebBluetoothSupported } from '../services/bluetoothService';

/**
 * WearableMonitor — Web Bluetooth heart rate monitoring + automated safety alerts.
 * Chrome/Android only. Premium feature.
 */
export default function WearableMonitor({
    isPremium,
    userId,
    userName,
    activeCarnivalId,
    onSafetyAlert // callback({ heartRate, duration }) — fires sendSafetyAlert Cloud Function
}) {
    const [isSupported] = useState(isWebBluetoothSupported());
    const [isConnected, setIsConnected] = useState(false);
    const [deviceName, setDeviceName] = useState('');
    const [heartRate, setHeartRate] = useState(null);
    const [hrHistory, setHrHistory] = useState([]); // last 30 readings for mini-chart
    const [safetyEnabled, setSafetyEnabled] = useState(true);
    const [safetyTriggered, setSafetyTriggered] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [error, setError] = useState(null);

    const hrMonitorRef = useRef(null);
    const safetyMonitorRef = useRef(null);

    // Initialize safety monitor
    useEffect(() => {
        const monitor = new SafetyMonitor((alertData) => {
            setSafetyTriggered(true);
            onSafetyAlert?.(alertData);
        });
        safetyMonitorRef.current = monitor;

        return () => monitor.stop();
    }, [onSafetyAlert]);

    // Toggle safety monitoring when setting changes
    useEffect(() => {
        if (!safetyMonitorRef.current) return;
        if (safetyEnabled && isConnected) {
            safetyMonitorRef.current.start();
        } else {
            safetyMonitorRef.current.stop();
        }
    }, [safetyEnabled, isConnected]);

    const handleConnect = async () => {
        setError(null);
        setConnecting(true);

        const monitor = new HeartRateMonitor();

        monitor.onReading = (reading) => {
            setHeartRate(reading.heartRate);
            setHrHistory(prev => [...prev.slice(-29), reading.heartRate]);

            // Feed to safety monitor
            if (safetyMonitorRef.current) {
                safetyMonitorRef.current.addReading(reading);
            }
        };

        monitor.onDisconnect = () => {
            setIsConnected(false);
            setHeartRate(null);
            setDeviceName('');
        };

        const result = await monitor.connect();
        setConnecting(false);

        if (result.success) {
            hrMonitorRef.current = monitor;
            setIsConnected(true);
            setDeviceName(result.deviceName);
        } else {
            setError(result.error);
        }
    };

    const handleDisconnect = () => {
        hrMonitorRef.current?.disconnect();
        hrMonitorRef.current = null;
        setIsConnected(false);
        setHeartRate(null);
        setDeviceName('');
        setHrHistory([]);
    };

    const handleDismissSafety = () => {
        setSafetyTriggered(false);
        safetyMonitorRef.current?.dismiss();
    };

    // Cleanup
    useEffect(() => {
        return () => {
            hrMonitorRef.current?.disconnect();
            safetyMonitorRef.current?.stop();
        };
    }, []);

    // Premium gate
    if (!isPremium) {
        return (
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">⌚</span>
                    <div className="flex-1">
                        <p className="font-bold text-amber-900 dark:text-amber-300">Wearable Safety Monitor</p>
                        <p className="text-xs text-amber-700 dark:text-amber-400">Connect your HR monitor for automated squad safety alerts</p>
                    </div>
                    <span className="px-2 py-1 text-[10px] font-bold bg-amber-500 text-white rounded-full uppercase">Premium</span>
                </div>
            </div>
        );
    }

    if (!isSupported) {
        return (
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <BluetoothOff className="w-5 h-5 text-gray-400" />
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Wearable Monitor</p>
                        <p className="text-xs text-gray-400">Web Bluetooth is only available on Chrome (Android/Desktop). Not supported on Safari/iOS.</p>
                    </div>
                </div>
            </div>
        );
    }

    // HR zone color
    const getHrColor = (hr) => {
        if (!hr) return 'text-gray-400';
        if (hr >= 160) return 'text-red-500';
        if (hr >= 120) return 'text-orange-500';
        if (hr >= 80) return 'text-green-500';
        return 'text-blue-500';
    };

    const getHrZone = (hr) => {
        if (!hr) return '';
        if (hr >= 160) return 'Max';
        if (hr >= 140) return 'Hard';
        if (hr >= 120) return 'Cardio';
        if (hr >= 100) return 'Active';
        if (hr >= 60) return 'Resting';
        return 'Low';
    };

    // Mini sparkline of HR history
    const maxHr = Math.max(...hrHistory, 100);
    const minHr = Math.min(...hrHistory, 60);
    const hrRange = maxHr - minHr || 1;

    return (
        <div className="relative overflow-hidden rounded-xl border border-pink-200 dark:border-pink-800">
            {/* Safety Alert Overlay */}
            {safetyTriggered && (
                <div className="absolute inset-0 z-10 bg-red-900/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-pulse">
                    <ShieldAlert className="w-12 h-12 text-red-300 mb-3" />
                    <p className="text-white font-bold text-lg text-center">Safety Alert Sent!</p>
                    <p className="text-red-200 text-sm text-center mt-1">Your squad has been notified to check on you.</p>
                    <button
                        onClick={handleDismissSafety}
                        className="mt-4 px-6 py-2 bg-white text-red-900 font-bold rounded-xl hover:bg-gray-100 transition"
                    >
                        I'm OK — Dismiss
                    </button>
                </div>
            )}

            {/* Header */}
            <div className={`px-4 py-3 flex items-center justify-between ${isConnected
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600'
                    : 'bg-gradient-to-r from-pink-500/10 to-rose-500/10 dark:from-pink-900/30 dark:to-rose-900/30'
                }`}>
                <div className="flex items-center gap-2">
                    <Heart className={`w-4 h-4 ${isConnected ? 'text-white animate-pulse' : 'text-pink-600 dark:text-pink-400'}`} />
                    <span className={`text-sm font-bold ${isConnected ? 'text-white' : 'text-pink-800 dark:text-pink-300'}`}>
                        Wearable Monitor
                    </span>
                    {isConnected && (
                        <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] text-white font-medium">
                            {deviceName}
                        </span>
                    )}
                </div>
                {isConnected && (
                    <button
                        onClick={handleDisconnect}
                        className="text-white/70 hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Body */}
            <div className="p-4 bg-white dark:bg-gray-800">
                {error && (
                    <div className="mb-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                {!isConnected ? (
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            Connect a Bluetooth heart rate monitor for real-time health tracking and squad safety alerts.
                        </p>
                        <button
                            onClick={handleConnect}
                            disabled={connecting}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-xl hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg shadow-pink-500/20 disabled:opacity-50"
                        >
                            <Bluetooth className="w-4 h-4" />
                            {connecting ? 'Connecting...' : 'Connect Wearable'}
                        </button>
                        <p className="text-[10px] text-gray-400 mt-2">
                            Works with Fitbit, Garmin, Polar, and other BLE heart rate monitors
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Heart Rate Display */}
                        <div className="flex items-center justify-center gap-4">
                            <div className="text-center">
                                <div className="flex items-baseline justify-center gap-1">
                                    <Heart className={`w-6 h-6 ${getHrColor(heartRate)} ${heartRate ? 'animate-pulse' : ''}`} />
                                    <span className={`text-4xl font-black ${getHrColor(heartRate)}`}>
                                        {heartRate || '--'}
                                    </span>
                                    <span className="text-sm text-gray-400 ml-1">bpm</span>
                                </div>
                                <span className={`text-xs font-medium ${getHrColor(heartRate)}`}>
                                    {getHrZone(heartRate)}
                                </span>
                            </div>
                        </div>

                        {/* HR Mini Sparkline */}
                        {hrHistory.length > 1 && (
                            <div className="h-12 flex items-end gap-px">
                                {hrHistory.map((hr, i) => {
                                    const height = ((hr - minHr) / hrRange) * 100;
                                    return (
                                        <div
                                            key={i}
                                            className={`flex-1 rounded-t-sm transition-all ${hr >= 160 ? 'bg-red-400' :
                                                    hr >= 120 ? 'bg-orange-400' :
                                                        hr >= 80 ? 'bg-green-400' :
                                                            'bg-blue-400'
                                                }`}
                                            style={{ height: `${Math.max(height, 4)}%`, opacity: 0.4 + (i / hrHistory.length) * 0.6 }}
                                        />
                                    );
                                })}
                            </div>
                        )}

                        {/* Safety Monitor Toggle */}
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <div className="flex items-center gap-2">
                                {safetyEnabled ? (
                                    <ShieldCheck className="w-4 h-4 text-green-500" />
                                ) : (
                                    <Shield className="w-4 h-4 text-gray-400" />
                                )}
                                <div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Safety Monitor</span>
                                    <p className="text-[10px] text-gray-400">Alerts squad if HR stays elevated</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSafetyEnabled(!safetyEnabled)}
                                className={`relative w-10 h-5 rounded-full transition-colors ${safetyEnabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                                    }`}
                            >
                                <span
                                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${safetyEnabled ? 'translate-x-5' : 'translate-x-0.5'
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
