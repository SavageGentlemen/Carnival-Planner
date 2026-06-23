const EARTH_RADIUS = 6371e3;
const DEG_TO_RAD = Math.PI / 180;
function calculateDistance(lat1, lon1, lat2, lon2) {
  const dLat = (lat2 - lat1) * DEG_TO_RAD;
  const dLon = (lon2 - lon1) * DEG_TO_RAD;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * DEG_TO_RAD) * Math.cos(lat2 * DEG_TO_RAD) * Math.sin(dLon / 2) ** 2;
  return EARTH_RADIUS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function calculateBearing(lat1, lon1, lat2, lon2) {
  const φ1 = lat1 * DEG_TO_RAD;
  const φ2 = lat2 * DEG_TO_RAD;
  const Δλ = (lon2 - lon1) * DEG_TO_RAD;
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return (Math.atan2(y, x) * (180 / Math.PI) + 360) % 360;
}
function gpsToLocalCartesian(userLat, userLon, targetLat, targetLon, elevationY = 1.5) {
  const dist = calculateDistance(userLat, userLon, targetLat, targetLon);
  const bearing = calculateBearing(userLat, userLon, targetLat, targetLon) * DEG_TO_RAD;
  const x = dist * Math.sin(bearing);
  const z = -dist * Math.cos(bearing);
  return [x, elevationY, z];
}
function formatDistance(meters) {
  if (meters < 1e3) return `${Math.round(meters)}m`;
  return `${(meters / 1e3).toFixed(1)}km`;
}
function getCompassDirection(degrees) {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(degrees / 45) % 8];
}
function getWaypointScale(distanceMeters) {
  if (distanceMeters < 50) return 1;
  if (distanceMeters < 200) return 1.5;
  if (distanceMeters < 500) return 2.5;
  if (distanceMeters < 1e3) return 3.5;
  return 5;
}
function clampPosition([x, y, z], maxRadius = 200) {
  const horizontalDist = Math.sqrt(x * x + z * z);
  if (horizontalDist <= maxRadius) return [x, y, z];
  const scale = maxRadius / horizontalDist;
  return [x * scale, y, z * scale];
}
export {
  clampPosition as a,
  getWaypointScale as b,
  calculateDistance as c,
  calculateBearing as d,
  getCompassDirection as e,
  formatDistance as f,
  gpsToLocalCartesian as g
};
