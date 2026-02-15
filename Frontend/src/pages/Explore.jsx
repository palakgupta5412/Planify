import React from 'react'
import Completed from '../components/Completed'
import Hero from '../components/Hero'

const Explore = () => {
  return (
    // Added overflow-hidden to prevent horizontal scrolling on mobile
    <div className='min-h-screen w-full overflow-x-hidden pb-10'>
        <Completed />
        <Hero />
    </div>
  )
}

export default Explore