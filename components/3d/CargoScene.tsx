"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

// ── Globe ──────────────────────────────────────────────────────────────────
function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.12;
    if (glowRef.current) glowRef.current.rotation.y += delta * 0.12;
  });

  // Simple land-mass geometry using a sphere with custom shader-like material
  return (
    <group>
      {/* Outer atmosphere glow */}
      <mesh ref={glowRef} scale={1.08}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#1E3A8A"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Ocean layer */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#1a4a8a"
          metalness={0.1}
          roughness={0.6}
          emissive="#0a1f4a"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Continent patches — simplified as raised bumps */}
      <ContinentPatch position={[0.6, 0.5, 1.2]}  scale={[0.55, 0.35, 0.08]} color="#2d5a1b" />
      <ContinentPatch position={[-0.5, 0.3, 1.3]} scale={[0.45, 0.3, 0.08]}  color="#3a6b22" />
      <ContinentPatch position={[1.1, 0.1, 0.9]}  scale={[0.5, 0.4, 0.08]}   color="#2d5a1b" />
      <ContinentPatch position={[-1.2, 0.2, 0.8]} scale={[0.4, 0.5, 0.08]}   color="#3a6b22" />
      <ContinentPatch position={[0.2, -0.6, 1.3]} scale={[0.35, 0.25, 0.08]} color="#2d5a1b" />
      <ContinentPatch position={[0.8, -0.4, 1.1]} scale={[0.3, 0.2, 0.08]}   color="#3a6b22" />
      <ContinentPatch position={[-0.3, 0.8, 1.2]} scale={[0.25, 0.2, 0.08]}  color="#2d5a1b" />
      <ContinentPatch position={[0.0, -1.0, 1.1]} scale={[0.5, 0.3, 0.08]}   color="#c8d8b0" /> {/* Antarctica */}

      {/* Latitude rings */}
      <LatRing y={0}    radius={1.52} />
      <LatRing y={0.75} radius={1.32} />
      <LatRing y={-0.75} radius={1.32} />

      {/* Longitude lines */}
      <LonLine angle={0} />
      <LonLine angle={Math.PI / 3} />
      <LonLine angle={(2 * Math.PI) / 3} />
    </group>
  );
}

function ContinentPatch({ position, scale, color }: {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
}) {
  const pos = new THREE.Vector3(...position).normalize().multiplyScalar(1.51);
  return (
    <mesh position={[pos.x, pos.y, pos.z]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color={color} roughness={0.8} metalness={0} />
      <mesh scale={scale}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </mesh>
  );
}

function LatRing({ y, radius }: { y: number; radius: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, y, Math.sin(a) * radius));
    }
    return pts;
  }, [y, radius]);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points);
    return g;
  }, [points]);

  return (
    <primitive object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#3B82F6", transparent: true, opacity: 0.2 }))} />
  );
}

function LonLine({ angle }: { angle: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const phi = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.sin(phi) * Math.cos(angle) * 1.52,
        Math.cos(phi) * 1.52,
        Math.sin(phi) * Math.sin(angle) * 1.52,
      ));
    }
    return pts;
  }, [angle]);

  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <primitive object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#3B82F6", transparent: true, opacity: 0.15 }))} />
  );
}

// ── Airplane orbiting the globe ────────────────────────────────────────────
function Airplane({ orbitRadius = 2.2, speed = 0.4, tilt = 0.4, phase = 0 }: {
  orbitRadius?: number;
  speed?: number;
  tilt?: number;
  phase?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const angleRef = useRef(phase);

  useFrame((_, delta) => {
    angleRef.current += delta * speed;
    const a = angleRef.current;

    if (groupRef.current) {
      // Orbit position (tilted ellipse)
      const x = Math.cos(a) * orbitRadius;
      const y = Math.sin(a) * orbitRadius * Math.sin(tilt);
      const z = Math.sin(a) * orbitRadius * Math.cos(tilt);

      groupRef.current.position.set(x, y, z);

      // Point nose in direction of travel
      const nx = -Math.sin(a) * orbitRadius;
      const ny = Math.cos(a) * orbitRadius * Math.sin(tilt);
      const nz = Math.cos(a) * orbitRadius * Math.cos(tilt);
      groupRef.current.lookAt(
        groupRef.current.position.x + nx,
        groupRef.current.position.y + ny,
        groupRef.current.position.z + nz,
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Fuselage */}
      <mesh>
        <cylinderGeometry args={[0.025, 0.04, 0.28, 8]} />
        <meshStandardMaterial color="#E2E8F0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Nose cone */}
      <mesh position={[0, 0.17, 0]}>
        <coneGeometry args={[0.025, 0.08, 8]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Main wings */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.35, 0.008, 0.07]} />
        <meshStandardMaterial color="#DC2626" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Tail fin vertical */}
      <mesh position={[0, -0.1, -0.02]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.008, 0.08, 0.06]} />
        <meshStandardMaterial color="#DC2626" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Tail wings horizontal */}
      <mesh position={[0, -0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.14, 0.006, 0.04]} />
        <meshStandardMaterial color="#DC2626" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Engine pods */}
      <mesh position={[0.1, 0.02, 0.02]}>
        <cylinderGeometry args={[0.015, 0.018, 0.07, 6]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.1, 0.02, 0.02]}>
        <cylinderGeometry args={[0.015, 0.018, 0.07, 6]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Engine glow */}
      <pointLight color="#EF4444" intensity={0.8} distance={0.5} />
    </group>
  );
}

// ── Orbit path ring ────────────────────────────────────────────────────────
function OrbitRing({ radius = 2.2, tilt = 0.4, color = "#DC2626" }: {
  radius?: number;
  tilt?: number;
  color?: string;
}) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.cos(a) * radius,
        Math.sin(a) * radius * Math.sin(tilt),
        Math.sin(a) * radius * Math.cos(tilt),
      ));
    }
    return pts;
  }, [radius, tilt]);

  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <primitive object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.18 }))} />
  );
}

// ── Floating particles ─────────────────────────────────────────────────────
function Particles() {
  const count = 80;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.8 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#93C5FD" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

// ── Scene ──────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-3, -2, -3]} intensity={0.4} color="#3B82F6" />
      <pointLight position={[0, 0, 4]} intensity={0.5} color="#EF4444" distance={8} />

      <Stars radius={60} depth={30} count={1500} factor={3} saturation={0.3} fade speed={0.5} />
      <Particles />

      <Globe />

      {/* Two airplanes on different orbits */}
      <OrbitRing radius={2.2} tilt={0.4}  color="#DC2626" />
      <OrbitRing radius={2.4} tilt={-0.3} color="#1E3A8A" />

      <Airplane orbitRadius={2.2} speed={0.45} tilt={0.4}  phase={0} />
      <Airplane orbitRadius={2.4} speed={0.3}  tilt={-0.3} phase={Math.PI} />
    </>
  );
}

// ── Export ─────────────────────────────────────────────────────────────────
export default function CargoScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
