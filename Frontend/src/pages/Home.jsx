import React from 'react'
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Completed from '../components/Completed'
import { FaPenToSquare } from "react-icons/fa6";
import FeatureCard from '../components/FeatureCard'
import features from '../constants/features'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="px-8 py-2 min-h-screen min-w-screen flex flex-col">
      <div className='flex justify-center items-center mt-10 mb-10'>
        <img src="./icon.svg" className='h-52 bg-cover' />        
      </div>
      <div>
        <h2 className='text-center text-white text-2xl'>Create plans. Capture experiences. Continue exploring.</h2>
        <p className='w-[70%] mx-auto text-center text-md text-[#DFB6B2] mt-5'>A simple space to organize what you want to try — from food to travel, places, experiences, and more. Categorize your plans, track progress, explore your ideas, and build your personal journey — beautifully.</p>
      </div>

      {/* Division */}
      <div className='w-full px-64 mt-24 h-[1px] bg-gradient-to-r from-transparent via-[#DFB6B2] to-transparent '>
      </div>

      {/* Features */}
      <div className='w-full min-h-screen mt-20 px-32 mb-20'>
        <h2 className='flex gap-2 text-2xl  items-center text-white'><FaPenToSquare /> Features</h2>
        <h4 className='mt-8 text-lg'>Planify helps you organize every idea — add plans, sort them by category, mark them as completed, explore your statistics, and relive your moments.</h4>
        <div className='flex flex-wrap gap-20 justify-center items-center '>
          {
          features.map((feature) => (
            <FeatureCard 
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
            />
          ))
        }
        </div>
      </div>

      {/* Division */}
      <div className='w-full px-64 mt-20 h-[1px] bg-gradient-to-r from-transparent via-[#DFB6B2] to-transparent '>
      </div>

      <Footer />
    </div>
  )
}

export default Home