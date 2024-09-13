import React, { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const IphoneModel = () => {
  const group = useRef();
  const { nodes, materials } = useGLTF("/Iphone15.glb", true, (error) => {
    console.error("Error loading GLTF model:", error);
  });

  useEffect(() => {
    if (!group.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#three-canvas-container",
        scrub: 1,
        markers: true, // Enable markers for debugging
        pin: true,
        start: "top top",
        end: "bottom top",
      },
    });

    // Rotate the model from left to right as you scroll down
    tl.to(group.current.rotation, { y: Math.PI / 4, duration: 2 });
  }, []);

  if (!nodes || !materials) return null; // Early return if model is not loaded yet

  return (
    <group
      ref={group}
      dispose={null}
      scale={0.2}
      // Adjust the initial rotation to make the iPhone appear slanted
      rotation={[Math.PI / 6, -Math.PI / 6, 0]}
    >
      {/* GLTF Meshes */}
      <mesh geometry={nodes.M_Cameras.geometry} material={materials.cam} />
      <mesh geometry={nodes.M_Glass.geometry} material={materials["glass.001"]} />
      <mesh geometry={nodes.M_Metal_Rough.geometry} material={materials.metal_rough} />
      <mesh geometry={nodes.M_Metal_Shiny.geometry} material={materials.metal_Shiny} />
      <mesh geometry={nodes.M_Plastic.geometry} material={materials.metal_rough} />
      <mesh geometry={nodes.M_Portal.geometry} material={materials["M_Base.001"]} />
      <mesh geometry={nodes.M_Screen.geometry} material={materials.Screen} />
      <mesh geometry={nodes.M_Speakers.geometry} material={materials.metal_rough} />
      <mesh geometry={nodes.M_USB.geometry} material={materials.metal_rough} />
    </group>
  );
};

const Background = () => {
  const { scene } = useThree();
  useEffect(() => {
    scene.background = new THREE.Color("#555555");
  }, [scene]);

  return null;
};

const TextSection = () => {
  const textRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      textRefs.current,
      { opacity: 0 },
      {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#text-trigger",
          start: "top bottom",
          end: "center center",
          scrub: 1,
          markers: true, // Debugging markers
        },
      }
    );
  }, []);

  const texts = ["Ready 5", "Ready 4", "Ready 3", "Ready 2", "Ready 1"];

  return (
    <div
      id="text-trigger"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        top: "500px",
      }}
    >
      {texts.map((text, index) => (
        <h1 key={index} ref={(el) => (textRefs.current[index] = el)} style={{ opacity: 0 }}>
          {text}
        </h1>
      ))}
    </div>
  );
};

const ThreeScene = () => (
  <div id="three-canvas-container" style={{ width: "100vw", height: "500px" }}>
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: false }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />
      <IphoneModel />
      <Background />
    </Canvas>
  </div>
);

const Model1 = () => (
  <div style={{ display: "flex", flexDirection: "column", height: "400vh" }}>
    <div
      className="some-content"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>ACTION</h1>
    </div>

    {/* 3D Scene */}
    <ThreeScene />

    {/* Text Section */}
    <TextSection />
  </div>
);

export default Model1;
