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
    <div className="px-4 md:px-8 py-2 min-h-screen flex flex-col overflow-x-hidden">
      {/* Hero Icon */}
      <div className='flex justify-center items-center mt-10 mb-10'>
        <img src="./icon.svg" className='h-32 md:h-52 bg-cover' alt="Planify Icon" />        
      </div>

      {/* Hero Text */}
      <div className='px-2'>
        <h2 className='text-center text-white text-xl md:text-3xl font-bold leading-tight'>
          Create plans. Capture experiences. Continue exploring.
        </h2>
        <p className='w-full md:w-[70%] mx-auto text-center text-sm md:text-md text-[#DFB6B2] mt-5'>
          A simple space to organize what you want to try — from food to travel, places, experiences, and more. Categorize your plans, track progress, explore your ideas, and build your personal journey — beautifully.
        </p>
      </div>

      {/* Division Line - Responsive margins */}
      <div className='w-[80%] md:w-full max-w-4xl mx-auto mt-16 md:mt-24 h-[1px] bg-gradient-to-r from-transparent via-[#DFB6B2] to-transparent'>
      </div>

      {/* Features Section */}
      <div className='w-full min-h-screen mt-16 md:mt-20 px-4 md:px-32 mb-20'>
        <h2 className='flex gap-2 text-xl md:text-2xl items-center text-white'>
          <FaPenToSquare /> Features
        </h2>
        <h4 className='mt-6 md:mt-8 text-md md:text-lg text-zinc-300'>
          Planify helps you organize every idea — add plans, sort them by category, mark them as completed, explore your statistics, and relive your moments.
        </h4>

        {/* Features Grid - Gap adjusted for mobile */}
        <div className='flex flex-wrap gap-8 md:gap-20 justify-center items-center mt-12'>
          {features.map((feature) => (
            <FeatureCard 
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
            />
          ))}
        </div>
      </div>

      {/* Bottom Division */}
      <div className='w-[80%] md:w-full max-w-4xl mx-auto mt-10 h-[1px] bg-gradient-to-r from-transparent via-[#DFB6B2] to-transparent'>
      </div>

      <Footer />
    </div>
  )
}

export default Home