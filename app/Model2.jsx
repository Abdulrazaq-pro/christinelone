import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const IphoneModel = () => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Iphone15.glb')

  return (
    <group ref={group} dispose={null} scale={0.8} rotation={[Math.PI / 2, 0, 0]}>
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
      camera={{ position: [0, 0, 12], fov: 45 }} // Adjusted the camera position and fov to zoom out
      gl={{ antialias: true, alpha: true }} // Enable transparency
      style={{ background: 'none' }} // Ensure no background
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />
      <IphoneModel />
    </Canvas>
  )
}

// New Component to render 3 iPhone models in a row
const IphoneRow = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        gap: '10px',
        minHeight: '100vh', // Make sure it takes at least full viewport height
      }}
    >
      <div style={{ width: '30%', flexBasis: '30%' }}>
        <ThreeScene />
      </div>
      <div style={{ width: '30%', flexBasis: '30%' }}>
        <ThreeScene />
      </div>
      <div style={{ width: '30%', flexBasis: '30%' }}>
        <ThreeScene />
      </div>
    </div>
  )
}

const Model2 = () => (
  <div style={{ width: '100vw', minHeight: '100vh' }}>
    <IphoneRow />
  </div>
)

export default Model2
