'use client'

import Image from 'next/image'
import Model1 from './components/Model1'
import Model2 from './components/Model2'


export default function Home() {
  return (
    <main className="">
    {/* <main className="flex min-h-screen flex-col items-center justify-between p-24"> */}
      <Model1/>
      
      <Model2/>
      
    </main>
    
  )
}
