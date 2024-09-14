import React, { useRef, useEffect, forwardRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

// Preload the GLTF model
useGLTF.preload('/Iphone15.glb');

// Define the IphoneModel component using forwardRef
const IphoneModel = forwardRef(({ position }, ref) => {
  const { nodes, materials } = useGLTF('/Iphone15.glb'); // Ensure correct model path

  if (!nodes || !materials) {
    console.error("GLTF model not loaded correctly. Please check the path '/Iphone15.glb'");
    return null; // Return null if model fails to load
  }

  return (
    <group ref={ref} dispose={null} scale={0.2} position={position}>
      <mesh geometry={nodes.M_Cameras.geometry} material={materials.cam} />
      <mesh geometry={nodes.M_Glass.geometry} material={materials['glass.001']} />
      <mesh geometry={nodes.M_Metal_Rough.geometry} material={materials.metal_rough} />
      <mesh geometry={nodes.M_Metal_Shiny.geometry} material={materials.metal_Shiny} />
      <mesh geometry={nodes.M_Plastic.geometry} material={materials.metal_rough} />
      <mesh geometry={nodes.M_Portal.geometry} material={materials['M_Base.001']} />
      <mesh geometry={nodes.M_Screen.geometry} material={materials.Screen} />
      <mesh geometry={nodes.M_Speakers.geometry} material={materials.metal_rough} />
      <mesh geometry={nodes.M_USB.geometry} material={materials.metal_rough} />
    </group>
  );
});

const Carousel = () => {
  const modelsRef = useRef([]);

  useEffect(() => {
    const radius = 5; // Carousel radius
    const duration = 10; // Duration of carousel rotation

    // Check if modelsRef contains elements before starting animation
    if (modelsRef.current.length > 0) {
      gsap.to(modelsRef.current, {
        rotationY: 360,
        duration: duration,
        repeat: -1,
        ease: 'none',
        onUpdate: function () {
          modelsRef.current.forEach((model, index) => {
            if (model) {
              const angle = (index / modelsRef.current.length) * Math.PI * 2;
              const x = radius * Math.cos(angle);
              const z = radius * Math.sin(angle);
              model.position.set(x, 0, z); // Set the position of each model
            }
          });
        },
      });
    }
  }, []);

  return (
    <>
      <IphoneModel ref={(el) => (modelsRef.current[0] = el)} />
      <IphoneModel ref={(el) => (modelsRef.current[1] = el)} />
      <IphoneModel ref={(el) => (modelsRef.current[2] = el)} />
    </>
  );
};

const Background = () => {
  const { scene } = useThree();

  useEffect(() => {
    if (scene) {
      // Ensure the scene is defined before setting the background
      scene.background = new THREE.Color('#555555');
    }
  }, [scene]);

  return null;
};

const Model2 = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '400vh' }}>
    <div
      className="some-content"
      style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <h1>ACTION</h1>
    </div>
    <div id="three-canvas-container" style={{ width: '100vw', height: '500px' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: false }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 7.5]} intensity={1} />
        <Carousel /> {/* Carousel with 3D models */}
        <Background /> {/* Set background if scene exists */}
      </Canvas>
    </div>
  </div>
);

export default Model2;
