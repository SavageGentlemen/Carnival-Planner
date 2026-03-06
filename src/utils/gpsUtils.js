/**
 * GPS Utilities — Convert geographic coordinates to local 3D space.
 * Used by the AR overlay to position waypoints in WebXR scenes.
 */

const EARTH_RADIUS = 6371000; // meters
const DEG_TO_RAD = Math.PI / 180;

/**
 * Calculate the great-circle distance between two GPS points (Haversine formula).
 * @returns Distance in meters
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
    const dLat = (lat2 - lat1) * DEG_TO_RAD;
    const dLon = (lon2 - lon1) * DEG_TO_RAD;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * DEG_TO_RAD) * Math.cos(lat2 * DEG_TO_RAD) *
        Math.sin(dLon / 2) ** 2;
    return EARTH_RADIUS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Calculate the initial bearing from point 1 to point 2.
 * @returns Bearing in degrees (0-360, clockwise from North)
 */
export function calculateBearing(lat1, lon1, lat2, lon2) {
    const φ1 = lat1 * DEG_TO_RAD;
    const φ2 = lat2 * DEG_TO_RAD;
    const Δλ = (lon2 - lon1) * DEG_TO_RAD;
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    return (Math.atan2(y, x) * (180 / Math.PI) + 360) % 360;
}

/**
 * Convert a target GPS coordinate to local 3D Cartesian coordinates
 * relative to the user's position (origin = 0,0,0).
 *
 * Coordinate system:
 *   X → East  (positive = east)
 *   Y → Up    (elevation, usually 0)
 *   Z → South (positive = south, Three.js convention: -Z is forward/north)
 *
 * @returns [x, y, z] in meters
 */
export function gpsToLocalCartesian(userLat, userLon, targetLat, targetLon, elevationY = 1.5) {
    const dist = calculateDistance(userLat, userLon, targetLat, targetLon);
    const bearing = calculateBearing(userLat, userLon, targetLat, targetLon) * DEG_TO_RAD;

    // X = east offset, Z = south offset (Three.js: -Z = north)
    const x = dist * Math.sin(bearing);
    const z = -dist * Math.cos(bearing); // negative because Three.js -Z is north

    return [x, elevationY, z];
}

/**
 * Format a distance in meters to a human-readable string.
 */
export function formatDistance(meters) {
    if (meters < 1000) return `${Math.round(meters)}m`;
    return `${(meters / 1000).toFixed(1)}km`;
}

/**
 * Get a compass direction string from a bearing in degrees.
 */
export function getCompassDirection(degrees) {
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return dirs[Math.round(degrees / 45) % 8];
}

/**
 * Calculate a dynamic scale for AR waypoints based on distance.
 * Faraway waypoints get larger so they remain visible.
 * @returns Scale factor (1.0 = close, up to 5.0 = very far)
 */
export function getWaypointScale(distanceMeters) {
    if (distanceMeters < 50) return 1.0;
    if (distanceMeters < 200) return 1.5;
    if (distanceMeters < 500) return 2.5;
    if (distanceMeters < 1000) return 3.5;
    return 5.0;
}

/**
 * Clamp waypoint positions so extremely distant points don't render
 * too far away in the 3D scene (keeps them within a viewable radius).
 * @param maxRadius Maximum render distance in meters
 */
export function clampPosition([x, y, z], maxRadius = 200) {
    const horizontalDist = Math.sqrt(x * x + z * z);
    if (horizontalDist <= maxRadius) return [x, y, z];
    const scale = maxRadius / horizontalDist;
    return [x * scale, y, z * scale];
}
