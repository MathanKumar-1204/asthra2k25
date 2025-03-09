import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";

const Cube = ({ scrollProgress }) => {
  const meshRef = useRef();

  // Load textures
  const logoTexture = useLoader(THREE.TextureLoader, "/1ef725eabb5f5bf50d2918dc3d93dd68.jpg");
  const eventsTexture = useLoader(THREE.TextureLoader, "/OIP.jpg");
  const sponsorsTexture = useLoader(THREE.TextureLoader, "/1279247.png");

  useFrame(() => {
    if (meshRef.current) {
      const moveX = Math.min(Math.max(scrollProgress * 4 - 3, -4.5), 1.5);
      const moveY = Math.min(Math.max(-scrollProgress * 4 + 2, -2), 2);

      meshRef.current.position.set(moveX, moveY, 0);

      let targetRotation = new THREE.Euler(0, 0, 0);

      if (scrollProgress >= 0.2 && scrollProgress < 0.5) {
        targetRotation.set(0, Math.PI / 2, 0);
      } else if (scrollProgress >= 0.5) {
        targetRotation.set(Math.PI / 2, 0, 0);
      }

      meshRef.current.rotation.x += (targetRotation.x - meshRef.current.rotation.x) * 0.15;
      meshRef.current.rotation.y += (targetRotation.y - meshRef.current.rotation.y) * 0.15;
      meshRef.current.rotation.z += (targetRotation.z - meshRef.current.rotation.z) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[-2, 2, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshBasicMaterial attach="material-0" color="gray" />
      <meshBasicMaterial attach="material-1" map={eventsTexture} />
      <meshBasicMaterial attach="material-2" map={sponsorsTexture} />
      <meshBasicMaterial attach="material-3" color="gray" />
      <meshBasicMaterial attach="material-4" map={logoTexture} />
      <meshBasicMaterial attach="material-5" color="gray" />
    </mesh>
  );
};

const Cubescroll = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Background Canvas */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <Canvas>
          <ambientLight intensity={0.5} />
          <Cube scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* Symposium Description - Moved Up */}
      <div id="logo-section" className="mt-[10vh] text-center w-3/4  h-100vh flex justify-end items-center  relative z-10">
        <div className="w-2/3 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Symposium 2025</h2>
          <p>Join us for an exciting event filled with talks, workshops, and networking opportunities.</p>
        </div>
      </div>

      {/* Tech & Non-Tech Events - Moved Up */}
      <div id="events-section" className="mt-[10vh] text-center w-full flex flex-col items-center px-10 relative z-10">
        <div className="w-2/3 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Tech Events</h2>
          <p>Explore our tech events and workshops.</p>
        </div>
        <div className="w-2/3 p-6 bg-gray-800 text-white rounded-lg shadow-lg mt-4">
          <h2 className="text-2xl font-bold">Non-Tech Events</h2>
          <p>Join our non-tech events and activities.</p>
        </div>
      </div>

      {/* Sponsors - Moved Up */}
      <div id="sponsors-section" className="mt-[10vh] text-center w-full flex justify-center items-center px-10 relative z-10">
        <div className="w-2/3 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Our Sponsors</h2>
          <p>Meet our sponsors who make this event possible.</p>
        </div>
      </div>

      {/* Extra spacing at bottom to prevent cutoff */}
      <div className="h-[20vh]" />
    </div>
  );
};
export default Cubescroll;
