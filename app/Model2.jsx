import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const IphoneModel = ({ scale = [0.3, 0.3, 1] }) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Iphone15.glb')

  return (
    <group ref={group} dispose={null} scale={scale} rotation={[Math.PI / 2, 0, 0]}>
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
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }} style={{ background: 'none' }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />
      {/* Render 3 iPhone models within one Canvas */}
      <group position={[-4, 0, 0]}>
        <IphoneModel />
      </group>
      <group position={[0, 0, 0]}>
        <IphoneModel />
      </group>
      <group position={[4, 0, 0]}>
        <IphoneModel />
      </group>
    </Canvas>
  )
}

const Model2 = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <div id="three-canvas-container">
      <ThreeScene />
    </div>
  </div>
)

export default Model2
