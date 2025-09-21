import React from 'react'
import Hero from '@/components/home/Hero'
import HowItWorks from '@/components/home/howitworks'

export default function Home() {
  return (
    <div className='space-y-24'>
      <Hero />
      <HowItWorks  />
    </div>
  )
}
