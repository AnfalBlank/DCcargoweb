"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sphere } from "@react-three/drei";
import * as THREE from "three";

// ── Earth Globe ─────────────────────────────────────────────────────────────
function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (earthRef.current)  earthRef.current.rotation.y  += delta * 0.08;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.10;
  });

  // Build a simple procedural earth texture using canvas
  const earthTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Ocean base
    ctx.fillStyle = "#1a4a8a";
    ctx.fillRect(0, 0, size, size);

    // Gradient ocean depth
    const oceanGrad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    oceanGrad.addColorStop(0, "rgba(30,90,160,0.4)");
    oceanGrad.addColorStop(1, "rgba(10,30,80,0.6)");
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, size, size);

    // Land masses (simplified continents)
    ctx.fillStyle = "#2d6a1f";

    // Asia / Europe
    ctx.beginPath();
    ctx.ellipse(340, 140, 110, 70, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(290, 120, 60, 40, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Africa
    ctx.beginPath();
    ctx.ellipse(300, 230, 50, 80, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Americas
    ctx.beginPath();
    ctx.ellipse(120, 160, 45, 70, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(140, 280, 35, 60, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Australia
    ctx.beginPath();
    ctx.ellipse(420, 290, 45, 30, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Greenland
    ctx.beginPath();
    ctx.ellipse(200, 80, 25, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    // Antarctica
    ctx.fillStyle = "#dde8f0";
    ctx.beginPath();
    ctx.ellipse(256, 490, 180, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    // Arctic
    ctx.beginPath();
    ctx.ellipse(256, 22, 180, 28, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter land highlights
    ctx.fillStyle = "rgba(80,160,50,0.35)";
    ctx.beginPath();
    ctx.ellipse(340, 135, 100, 60, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(120, 155, 38, 60, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Grid lines (lat/lon)
    ctx.strokeStyle = "rgba(100,160,255,0.18)";
    ctx.lineWidth = 1;
    // Latitude lines
    for (let lat = 1; lat < 6; lat++) {
      const y = (lat / 6) * size;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }
    // Longitude lines
    for (let lon = 1; lon < 8; lon++) {
      const x = (lon / 8) * size;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  return (
    <group>
      {/* Atmosphere glow (back side) */}
      <mesh scale={1.12}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#4488ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Atmosphere rim */}
      <mesh scale={1.06}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#2255cc"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Earth sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          metalness={0.05}
          roughness={0.75}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef} scale={1.015}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ── Airplane ────────────────────────────────────────────────────────────────
function Airplane({
  orbitRadius = 2.3,
  speed = 0.5,
  tiltX = 0.4,
  tiltZ = 0,
  phase = 0,
  color = "#DC2626",
}: {
  orbitRadius?: number;
  speed?: number;
  tiltX?: number;
  tiltZ?: number;
  phase?: number;
  color?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const angle = useRef(phase);

  useFrame((_, delta) => {
    angle.current += delta * speed;
    const a = angle.current;

    // Tilted orbit
    const x =  Math.cos(a) * orbitRadius;
    const y =  Math.sin(a) * orbitRadius * Math.sin(tiltX);
    const z =  Math.sin(a) * orbitRadius * Math.cos(tiltX);

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);

      // Tangent direction (velocity vector)
      const tx = -Math.sin(a) * orbitRadius;
      const ty =  Math.cos(a) * orbitRadius * Math.sin(tiltX);
      const tz =  Math.cos(a) * orbitRadius * Math.cos(tiltX);

      groupRef.current.lookAt(x + tx, y + ty, z + tz);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.022, 0.035, 0.26, 8]} />
        <meshStandardMaterial color="#F1F5F9" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 0, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.022, 0.07, 8]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Main wings */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.32, 0.006, 0.065]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Tail horizontal */}
      <mesh position={[0, 0, 0.1]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.13, 0.005, 0.04]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Tail vertical */}
      <mesh position={[0, 0.05, 0.1]}>
        <boxGeometry args={[0.005, 0.07, 0.045]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Engine glow */}
      <pointLight color={color} intensity={0.6} distance={0.6} />
    </group>
  );
}

// ── Orbit ring ───────────────────────────────────────────────────────────────
function OrbitRing({ radius, tiltX, color }: { radius: number; tiltX: number; color: string }) {
  const line = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.cos(a) * radius,
        Math.sin(a) * radius * Math.sin(tiltX),
        Math.sin(a) * radius * Math.cos(tiltX),
      ));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25 });
    return new THREE.Line(geo, mat);
  }, [radius, tiltX, color]);

  return <primitive object={line} />;
}

// ── Scene ────────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]}  intensity={1.4} color="#ffffff" />
      <directionalLight position={[-4, -2, -3]} intensity={0.3} color="#4488ff" />

      <Stars radius={80} depth={40} count={2000} factor={3} saturation={0.2} fade speed={0.4} />

      <Earth />

      <OrbitRing radius={2.3} tiltX={0.45}  color="#DC2626" />
      <OrbitRing radius={2.5} tiltX={-0.35} color="#1E3A8A" />

      <Airplane orbitRadius={2.3} speed={0.5}  tiltX={0.45}  phase={0}        color="#DC2626" />
      <Airplane orbitRadius={2.5} speed={0.32} tiltX={-0.35} phase={Math.PI}  color="#1E3A8A" />
    </>
  );
}

// ── Export ───────────────────────────────────────────────────────────────────
export default function CargoScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 48 }}
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
