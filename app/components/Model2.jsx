import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

const IphoneModel = ({ position }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF('/Iphone15.glb');

  return (
    <group ref={group} dispose={null} scale={0.2} position={position}>
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

const Carousel = () => {
  const modelsRef = useRef([]);

  useEffect(() => {
    // Carousel effect using GSAP
    const radius = 5; // Carousel radius
    const duration = 10; // Time to complete one full rotation

    gsap.to(modelsRef.current, {
      rotationY: 360,
      duration: duration,
      repeat: -1, // Infinite loop
      ease: "none", // Linear animation
      modifiers: {
        rotationY: (rotationY) => `${parseFloat(rotationY) % 360}deg`,
      },
    });

    modelsRef.current.forEach((model, index) => {
      const angle = (index / modelsRef.current.length) * Math.PI * 2;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);

      gsap.set(model.position, { x, z });
    });
  }, []);

  return (
    <>
      {/* Render three iPhone models */}
      <IphoneModel ref={(el) => (modelsRef.current[0] = el)} />
      <IphoneModel ref={(el) => (modelsRef.current[1] = el)} />
      <IphoneModel ref={(el) => (modelsRef.current[2] = el)} />
    </>
  );
};

const Background = () => {
  const scene = useRef();
  useEffect(() => {
    scene.current.background = new THREE.Color('#555555');
  }, []);

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
        {/* GSAP carousel effect */}
        <Carousel />
        <Background />
      </Canvas>
    </div>
  </div>
);

export default Model2;
