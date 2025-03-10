import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

const CubeAnimation = ({ currentSection }) => {
  const mountRef = useRef(null);
  const [cube, setCube] = useState(null);
  const requestRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    console.log("CubeAnimation component mounted");

    if (!mountRef.current) {
      console.log("mountRef is NULL! Retrying...");
      return;
    }

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const mountNode = mountRef.current;
    mountNode.appendChild(renderer.domElement);

    // Store references
    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;

    // Cube with Textures
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const textureLoader = new THREE.TextureLoader();
    const materials = [
      new THREE.MeshBasicMaterial({ map: textureLoader.load("/texture1.jpg") }),
      new THREE.MeshBasicMaterial({ map: textureLoader.load("/ASTHRA.png") }),
      new THREE.MeshBasicMaterial({ map: textureLoader.load("/ASTHRA (1).png") }),
      new THREE.MeshBasicMaterial({ map: textureLoader.load("/texture4.jpg") }),
      new THREE.MeshBasicMaterial({ map: textureLoader.load("/ASTHRA (2).png") }),
      new THREE.MeshBasicMaterial({ map: textureLoader.load("/texture6.jpg") }),
    ];

    const cubeInstance = new THREE.Mesh(geometry, materials);
    scene.add(cubeInstance);
    setCube(cubeInstance);

    // Initial Position (More to the Left) & Rotation (Facing Camera)
    cubeInstance.position.set(-5, 0, 0);
    cubeInstance.rotation.set(0, 0, 0); // Ensuring the front face is visible

    // Rendering Function
    const animate = () => {
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      console.log("CubeAnimation component unmounting...");
      if (mountNode) {
        mountNode.removeChild(renderer.domElement);
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!cube) return;

    let targetPosition = { x: -5, y: 0, z: 0 };
    let targetRotation = { x: 0, y: 0, z: 0 };

    switch (currentSection) {
      case "sympo":
        targetPosition = { x: -3, y: 0, z: 0 };
        targetRotation = { x: 0, y: Math.PI / 2, z: 0 }; // Rotate 90° on Y-axis
        break;
      case "events":
        targetPosition = { x: 0, y: 2, z: 0 };
        targetRotation = { x: Math.PI / 2, y: 0, z: 0 }; // Rotate 90° on X-axis
        break;
      case "sponsors":
        targetPosition = { x: 3, y: 0, z: 0 };
        targetRotation = { x: 0, y: 0, z: Math.PI / 2 }; // Rotate 90° on Z-axis
        break;
      default:
        break;
    }

    gsap.to(cube.position, {
      duration: 1,
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
    });

    gsap.to(cube.rotation, {
      duration: 1,
      x: targetRotation.x,
      y: targetRotation.y,
      z: targetRotation.z,
    });
  }, [currentSection, cube]);

  return (
    <div
    className="absolute left-0"
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        pointerEvents: "none",
      }}
    />
  );
};

export default CubeAnimation;
