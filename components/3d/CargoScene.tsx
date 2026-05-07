"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Box, Torus, MeshDistortMaterial, Environment, Stars } from "@react-three/drei";
import * as THREE from "three";

function FloatingBox({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 0.7, 0.8]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

function GlowingSphere({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function RotatingRing({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.z += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1.2, 0.08, 16, 100]} />
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color="#F97316"
          attach="material"
          distort={0.15}
          speed={1.5}
          roughness={0.05}
          metalness={0.9}
          emissive="#F97316"
          emissiveIntensity={0.15}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = 200;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#F97316"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function CargoScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#F97316" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#EF4444" />
          <pointLight position={[0, 5, 0]} intensity={0.8} color="#ffffff" />

          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <ParticleField />

          <CentralOrb />
          <RotatingRing position={[0, 0, 0]} color="#F97316" />
          
          <FloatingBox position={[-3.5, 1.5, -1]} color="#F97316" scale={0.8} />
          <FloatingBox position={[3.5, -1, -2]} color="#EF4444" scale={0.6} />
          <FloatingBox position={[-2.5, -2, 1]} color="#FB923C" scale={0.5} />
          <FloatingBox position={[2.5, 2, 0]} color="#DC2626" scale={0.7} />

          <GlowingSphere position={[-4, 0, -3]} color="#F97316" />
          <GlowingSphere position={[4, 1, -2]} color="#EF4444" />

          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
