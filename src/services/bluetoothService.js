/**
 * Web Bluetooth Heart Rate Service + Safety Monitor
 * Connects to BLE heart rate monitors and monitors for safety conditions.
 * Chrome/Edge/Android only — Safari does NOT support Web Bluetooth.
 */

/**
 * Check if Web Bluetooth is available in this browser.
 */
export function isWebBluetoothSupported() {
    return !!navigator.bluetooth;
}

/**
 * Heart Rate Monitor — connects to a BLE HR device and streams readings.
 */
export class HeartRateMonitor {
    constructor() {
        this.device = null;
        this.server = null;
        this.characteristic = null;
        this.onReading = null;       // callback({ heartRate, contactDetected, timestamp })
        this.onDisconnect = null;    // callback()
        this.isConnected = false;
    }

    /**
     * Request and connect to a BLE heart rate monitor.
     * Shows the browser's native device picker dialog.
     */
    async connect() {
        if (!isWebBluetoothSupported()) {
            throw new Error('Web Bluetooth is not supported in this browser. Use Chrome on Android or Desktop.');
        }

        try {
            // Request device with Heart Rate service
            this.device = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['heart_rate'] }],
                optionalServices: ['battery_service'],
            });

            this.device.addEventListener('gattserverdisconnected', () => {
                this.isConnected = false;
                this.onDisconnect?.();
                console.log('BLE HR Monitor: Disconnected');
            });

            // Connect to GATT server
            this.server = await this.device.gatt.connect();
            console.log('BLE HR Monitor: Connected to', this.device.name);

            // Get Heart Rate service and measurement characteristic
            const service = await this.server.getPrimaryService('heart_rate');
            this.characteristic = await service.getCharacteristic('heart_rate_measurement');

            // Subscribe to HR notifications
            await this.characteristic.startNotifications();
            this.characteristic.addEventListener('characteristicvaluechanged', (event) => {
                const value = event.target.value;
                const parsed = this._parseHeartRate(value);
                this.onReading?.(parsed);
            });

            this.isConnected = true;
            return {
                success: true,
                deviceName: this.device.name || 'HR Monitor',
            };
        } catch (err) {
            console.error('BLE HR Monitor: Connection failed:', err);
            return {
                success: false,
                error: err.message,
            };
        }
    }

    /**
     * Disconnect from the device.
     */
    disconnect() {
        if (this.characteristic) {
            try {
                this.characteristic.stopNotifications();
            } catch (e) { /* ignore */ }
        }
        if (this.device?.gatt?.connected) {
            this.device.gatt.disconnect();
        }
        this.isConnected = false;
        this.device = null;
        this.server = null;
        this.characteristic = null;
    }

    /**
     * Parse the Heart Rate Measurement characteristic value.
     * Follows Bluetooth Heart Rate Profile specification.
     */
    _parseHeartRate(dataView) {
        const flags = dataView.getUint8(0);
        const is16Bit = flags & 0x01;
        const contactDetected = (flags & 0x06) === 0x06;

        let heartRate;
        if (is16Bit) {
            heartRate = dataView.getUint16(1, true);
        } else {
            heartRate = dataView.getUint8(1);
        }

        return {
            heartRate,
            contactDetected,
            timestamp: Date.now(),
        };
    }
}

/**
 * Safety Monitor — watches heart rate readings and triggers alerts
 * when dangerous conditions are detected.
 *
 * Alert condition: HR > 160 bpm sustained for > 3 minutes with continuous movement
 */
export class SafetyMonitor {
    constructor(onAlert) {
        this.onAlert = onAlert;        // callback({ heartRate, duration, message })
        this.readings = [];            // last N readings
        this.isMonitoring = false;
        this.lastAlertTime = 0;
        this.alertCooldownMs = 15 * 60 * 1000; // 15 minute cooldown
        this.thresholdBpm = 160;
        this.sustainedDurationMs = 3 * 60 * 1000; // 3 minutes
        this.hasMotion = false;
        this.motionHandler = null;
        this.dismissed = false;
    }

    /**
     * Start monitoring heart rate readings.
     */
    start() {
        this.isMonitoring = true;
        this.dismissed = false;
        this.readings = [];

        // Listen for device motion (movement indicator)
        if (window.DeviceMotionEvent) {
            this.motionHandler = (event) => {
                const acc = event.accelerationIncludingGravity;
                if (!acc) return;
                const magnitude = Math.sqrt(
                    (acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2
                );
                // Threshold: significant movement beyond gravity (~9.8)
                this.hasMotion = magnitude > 12;
            };
            window.addEventListener('devicemotion', this.motionHandler);
        } else {
            // No motion API — assume movement (safer default)
            this.hasMotion = true;
        }
    }

    /**
     * Stop monitoring.
     */
    stop() {
        this.isMonitoring = false;
        this.readings = [];
        if (this.motionHandler) {
            window.removeEventListener('devicemotion', this.motionHandler);
            this.motionHandler = null;
        }
    }

    /**
     * Feed a new heart rate reading into the monitor.
     */
    addReading(reading) {
        if (!this.isMonitoring || this.dismissed) return;

        this.readings.push(reading);

        // Keep only last 5 minutes of readings
        const fiveMinAgo = Date.now() - 5 * 60 * 1000;
        this.readings = this.readings.filter(r => r.timestamp > fiveMinAgo);

        this._checkThreshold();
    }

    /**
     * User dismisses the alert ("I'm OK").
     */
    dismiss() {
        this.dismissed = true;
        // Reset after cooldown
        setTimeout(() => {
            this.dismissed = false;
        }, this.alertCooldownMs);
    }

    /**
     * Check if alert conditions are met.
     */
    _checkThreshold() {
        const now = Date.now();

        // Don't alert during cooldown
        if (now - this.lastAlertTime < this.alertCooldownMs) return;

        // Need at least 3 minutes of data
        const threeMinAgo = now - this.sustainedDurationMs;
        const recentReadings = this.readings.filter(r => r.timestamp >= threeMinAgo);

        if (recentReadings.length < 10) return; // Need sufficient data points

        // Check if ALL recent readings are above threshold
        const allAboveThreshold = recentReadings.every(r => r.heartRate > this.thresholdBpm);

        if (allAboveThreshold && this.hasMotion) {
            const avgHR = Math.round(
                recentReadings.reduce((sum, r) => sum + r.heartRate, 0) / recentReadings.length
            );

            this.lastAlertTime = now;
            this.onAlert?.({
                heartRate: avgHR,
                duration: Math.round((now - recentReadings[0].timestamp) / 1000 / 60),
                message: `Elevated heart rate (${avgHR} bpm) sustained for ${Math.round((now - recentReadings[0].timestamp) / 1000 / 60)} minutes with continuous movement.`,
            });
        }
    }
}
