import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Cube = ({ scrollProgress }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = scrollProgress * Math.PI * 2; // Rotate based on scroll
      meshRef.current.rotation.x = scrollProgress * Math.PI; // Extra dynamic rotation
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
      {/* Box Geometry */}
      <boxGeometry args={[2, 2, 2]} />
      {/* Cyberpunk Neon Material */}
      <meshStandardMaterial
        color="#00FFFF"
        emissive="#00FFFF"
        emissiveIntensity={2}
        roughness={0.2}
        metalness={1}
      />
    </mesh>
  );
};

export default Cube;
