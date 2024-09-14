import React, { useRef, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const IphoneModel = () => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Iphone15.glb')

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#three-canvas-container',
        scrub: 1,
        pin: true,
        start: 'top top',
        end: 'bottom top',
      },
    })

    // Rotate the model along the Y-axis as the page scrolls
    tl.to(group.current.rotation, { z: Math.PI, duration: 2 }) // Rotates 180 degrees on the Y axis
  }, [])

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
const IphoneModel2 = () => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Iphone15.glb')

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#three-canvas-container',
        scrub: 1,
        pin: true,
        start: 'top top',
        end: 'bottom top',
      },
    })

    // Rotate the model along the Y-axis as the page scrolls
    tl.to(group.current.rotation, { z: Math.PI, duration: 2 }) // Rotates 180 degrees on the Y axis
  }, [])

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

const TextSection = () => {
  const textRefs = useRef([])

  useEffect(() => {
    gsap.fromTo(
      textRefs.current,
      { opacity: 0 },
      {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '#text-trigger',
          start: 'top bottom',
          end: 'center center',
          scrub: 1,
          markers: false,
        },
      }
    )
  }, [])

  const texts = ['Ready 5', 'Ready 4', 'Ready 3', 'Ready 2', 'Ready 1']

  return (
    <div
      id="text-trigger"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: '500px',
      }}
    >
      {texts.map((text, index) => (
        <h1 key={index} ref={(el) => (textRefs.current[index] = el)} style={{ opacity: 0 }}>
          {text}
        </h1>
      ))}
    </div>
  )
}

const ThreeScene = () => {
  const { camera } = useThree()
  
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#three-canvas-container',
        scrub: 1,
        start: 'top top',
        end: 'bottom top',
      },
    })

    // Animate the camera's Z position to zoom in as you scroll
    tl.to(camera.position, { z: 5, duration: 2 }) // Adjust Z to control zoom effect
  }, [camera])

  return null
}

const Model2 = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '400vh' }}>
    <div className="some-content" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1>ACTION</h1>
    </div>
    <div id="three-canvas-container" style={{ width: '100vw', height: '500px' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: false }}>
      {/* <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: false }}> */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 7.5]} intensity={1} />
        <IphoneModel />
        <ThreeScene /> {/* The component controlling the camera */}
        <Background />
      </Canvas>
    </div>
  
    <TextSection />
  </div>
)

export default Model2;