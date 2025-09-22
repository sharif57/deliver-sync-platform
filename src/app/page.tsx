import React from 'react'
import Hero from '@/components/home/Hero'
import HowItWorks from '@/components/home/howitworks'
import Features from '@/components/home/features'

export default function Home() {
  return (
    <div className=' space-y-6 md:space-y-12 lg:space-y-18'>
      <Hero />
      <HowItWorks  />
      <Features />
    </div>
  )
}
