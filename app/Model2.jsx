import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const IphoneModel = () => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Iphone15.glb')

  return (
    <group ref={group} dispose={null} scale={0.55} rotation={[0, 0, 0]}>
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

const ThreeScene = ({ rotationSpeed }) => {
  const group = useRef()
  useFrame(() => {
    group.current.rotation.y += rotationSpeed // Carousel rotation
  })

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50}} // Adjust FOV and camera position
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'none', height: '100%', width: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <group ref={group}>
        <IphoneModel />
      </group>
    </Canvas>
  )
}

const IphoneRow = () => {
  const [rotationSpeed] = useState(0.01) // Control carousel speed

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '90vh', // Provide enough vertical space
        gap: '10px',
      }}
    >
      <div style={{ width: '30%', height: '100%' }}>
        <ThreeScene rotationSpeed={rotationSpeed} />
      </div>
      <div style={{ width: '30%', height: '100%' }}>
        <ThreeScene rotationSpeed={rotationSpeed} />
      </div>
      <div style={{ width: '30%', height: '100%' }}>
        <ThreeScene rotationSpeed={rotationSpeed} />
      </div>
    </div>
  )
}

const Model2 = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <div id="three-canvas-container">
      <IphoneRow />
    </div>
  </div>
)

export default Model2
