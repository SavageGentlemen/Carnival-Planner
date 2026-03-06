import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import {
    gpsToLocalCartesian,
    calculateDistance,
    formatDistance,
    getWaypointScale,
    clampPosition
} from '../utils/gpsUtils';

// Pin type → color mapping (matches FeteMap PIN_TYPES)
const PIN_COLORS = {
    accommodation: '#3B82F6',
    costume: '#F59E0B',
    fete: '#EC4899',
    meetup: '#10B981',
    scraped: '#8B5CF6',
    default: '#EC4899'
};

/**
 * A single 3D waypoint floating in AR space.
 * Renders as a glowing sphere with a text label showing name + distance.
 */
function ARWaypointMesh({ position, name, type, distance }) {
    const meshRef = useRef();
    const glowRef = useRef();
    const color = PIN_COLORS[type] || PIN_COLORS.default;
    const scale = getWaypointScale(distance);

    // Gentle floating animation
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
        }
        if (glowRef.current) {
            glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
        }
    });

    return (
        <group position={position}>
            {/* Main sphere */}
            <mesh ref={meshRef} scale={[scale, scale, scale]}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={1.5}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Glow ring */}
            <mesh ref={glowRef} position={[0, position[1], 0]} scale={[scale * 1.3, scale * 1.3, scale * 1.3]}>
                <ringGeometry args={[0.5, 0.65, 32]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.3}
                    side={2} // DoubleSide
                />
            </mesh>

            {/* Name label */}
            <Text
                position={[0, position[1] + scale * 0.8, 0]}
                fontSize={0.25 * scale}
                color="white"
                anchorX="center"
                anchorY="bottom"
                outlineWidth={0.02}
                outlineColor="black"
                maxWidth={3}
            >
                {name || 'Waypoint'}
            </Text>

            {/* Distance label */}
            <Text
                position={[0, position[1] - scale * 0.6, 0]}
                fontSize={0.18 * scale}
                color="#94A3B8"
                anchorX="center"
                anchorY="top"
                outlineWidth={0.015}
                outlineColor="black"
            >
                {formatDistance(distance)}
            </Text>

            {/* Vertical beam connecting waypoint to ground */}
            <mesh position={[0, position[1] / 2, 0]}>
                <cylinderGeometry args={[0.02 * scale, 0.02 * scale, position[1], 8]} />
                <meshBasicMaterial color={color} transparent opacity={0.2} />
            </mesh>
        </group>
    );
}

/**
 * ARScene — The full 3D scene rendered inside the WebXR session.
 * Maps all waypoints (user locations + scraped events) to 3D space.
 */
export default function ARScene({ userLocation, waypoints = [] }) {
    // Convert all waypoints to 3D positions
    const waypointData = useMemo(() => {
        if (!userLocation) return [];

        return waypoints.map((wp) => {
            const rawPos = gpsToLocalCartesian(userLocation.lat, userLocation.lng, wp.lat, wp.lng);
            const pos = clampPosition(rawPos, 200); // max 200m render radius
            const dist = calculateDistance(userLocation.lat, userLocation.lng, wp.lat, wp.lng);

            return {
                id: wp.id || `${wp.lat}-${wp.lng}`,
                name: wp.name || wp.title || 'Waypoint',
                type: wp.type || 'default',
                position: pos,
                distance: dist
            };
        }).filter(wp => wp.distance > 5); // Don't render waypoints within 5m (too close)
    }, [userLocation, waypoints]);

    return (
        <>
            {/* Scene lighting */}
            <ambientLight intensity={0.6} />
            <pointLight position={[0, 10, 0]} intensity={0.4} />

            {/* Ground reference ring around user */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                <ringGeometry args={[2, 2.1, 64]} />
                <meshBasicMaterial color="#6366F1" transparent opacity={0.3} />
            </mesh>

            {/* Render all waypoints */}
            {waypointData.map((wp) => (
                <ARWaypointMesh
                    key={wp.id}
                    position={wp.position}
                    name={wp.name}
                    type={wp.type}
                    distance={wp.distance}
                />
            ))}

            {/* North indicator - small red sphere at 10m north */}
            <mesh position={[0, 2, -10]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshBasicMaterial color="#EF4444" />
            </mesh>
            <Text
                position={[0, 2.4, -10]}
                fontSize={0.2}
                color="#EF4444"
                anchorX="center"
                outlineWidth={0.015}
                outlineColor="black"
            >
                N
            </Text>
        </>
    );
}
