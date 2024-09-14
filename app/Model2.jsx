import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei'; // OrbitControls is already imported here
import { gsap } from 'gsap';

// iPhone Model Component
const IphoneModel = () => {
  const group = useRef();
  const { nodes, materials } = useGLTF('/Iphone15.glb');

  return (
    <group ref={group} scale={0.3} rotation={[Math.PI / 2, 0, 0]}>
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
};

// Three.js Scene Component
const ThreeScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ antialias: true, alpha: true }} // Enable transparency for background
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />
      <IphoneModel />
      <OrbitControls enableZoom={false} /> {/* Add OrbitControls to ThreeScene for interactivity */}
    </Canvas>
  );
};

// iPhone Row with GSAP Animation
const IphoneRow = () => {
  const rowRef = useRef();

  useEffect(() => {
    // GSAP animation to scale the row content dynamically
    gsap.to(rowRef.current, { scale: 1.5, duration: 1 }); // Add some animation duration
  }, []);

  return (
    <div
      ref={rowRef}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '500px',
        gap: '10px',
      }}
    >
      {/* Three iPhone models in a row */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="scale-300" style={{ width: '30%' }}>
          <ThreeScene />
        </div>
      ))}
    </div>
  );
};

// Model2 Component
const Model2 = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ antialias: true, alpha: false }} // No transparency needed here
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />
      <IphoneModel /> {/* This renders the iPhone model */}
      <OrbitControls enableZoom={false} /> {/* Optional: If you want to control the model */}
    </Canvas>
    {/* Include the IphoneRow or other components below the main canvas if needed */}
    <IphoneRow />
  </div>
);

export default Model2;
