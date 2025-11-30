import React from 'react'
import Button from '../components/button'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Completed from '../components/Completed'

const Home = () => {
  return (
    <div className="px-8 py-5 min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <Completed />
        <Hero />
        {/* <Button text="Click to Add" /> */}
        {/* <div className='backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg'>heya</div> */}
    </div>
  )
}

export default Home