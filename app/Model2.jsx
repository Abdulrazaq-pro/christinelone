import React, { useRef, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const IphoneModel = () => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Iphone15.glb')

  return (
    <group ref={group} dispose={null} scale={0.2} rotation={[Math.PI / 2, 0, 0]}>
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

const Background = () => {
  const { scene } = useThree()
  useEffect(() => {
    scene.background = new THREE.Color('#555555')
  }, [scene])

  return null
}

const ThreeScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: false }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />
      <IphoneModel />
      <Background />
    </Canvas>
  )
}

// New Component to render 3 iPhone models in a row
const IphoneRow = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100vw',
        height: '500px',
      }}
    >
      <div style={{ flex: 1 }}>
        <ThreeScene />
      </div>
      <div style={{ flex: 1 }}>
        <ThreeScene />
      </div>
      <div style={{ flex: 1 }}>
        <ThreeScene />
      </div>
    </div>
  )
}

const Model2 = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '400vh' }}>
    <div id="three-canvas-container">
      <IphoneRow />
    </div>
  </div>
)

export default Model2
