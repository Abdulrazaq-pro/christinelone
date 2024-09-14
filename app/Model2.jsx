import React, { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { gsap } from 'gsap'

const IphoneModel = () => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Iphone15.glb')

  return (
    <group ref={group} dispose={null} scale={0.3} rotation={[Math.PI / 2, 0, 0]}>
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
  )
}

const ThreeScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ antialias: true, alpha: true }} // Enable transparency
      style={{ background: 'none' }}        // Make sure background is none
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />
      <IphoneModel />
    </Canvas>
  )
}

const IphoneRow = () => {
  const rowRef = useRef()

  useEffect(() => {
    // GSAP set to instantly zoom in
    gsap.set(rowRef.current, { scale: 1.5 }) // Adjust the scale as per your zoom requirement
  }, [])

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
      <div className="scale-300" style={{ width: '30%', flexBasis: '30%' }}>
        <ThreeScene />
      </div>
      <div className="scale-300" style={{ width: '30%', flexBasis: '30%' }}>
        <ThreeScene />
      </div>
      <div className="scale-300" style={{ width: '30%', flexBasis: '30%' }}>
        <ThreeScene />
      </div>
    </div>
  )
}

const Model2 = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />
      <IphoneModel /> {/* This renders the iPhone model */}
      <OrbitControls enableZoom={false} /> {/* Optional: If you want to control the model */}
      <Background /> {/* This will set the background color of the scene */}
    </Canvas>
  </div>
);


export default Model2
