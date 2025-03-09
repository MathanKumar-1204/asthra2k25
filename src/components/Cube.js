import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Cube = ({ scrollProgress }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = scrollProgress * Math.PI * 2; // Rotate based on scroll
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default Cube;
