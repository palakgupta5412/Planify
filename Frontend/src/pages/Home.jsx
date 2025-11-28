import React from 'react'
import Button from '../components/button'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div className="px-8 py-5 text-[#FAE5D8] bg-fixed bg-gradient-to-b from-[#522959] via-[#824D69] to-[#180018] min-h-screen">
        <Navbar />
        <Button text="Click to Add" />
        {/* <div className='backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg'>heya</div> */}
    </div>
  )
}

export default Home