import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-auto w-full py-8 flex justify-center px-6 md:px-20 items-center border-t border-white/10 bg-black/0 backdrop-blur-sm">
        <div className='flex flex-col justify-center items-center text-center'>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">Planify</h2>
            
            <p className="text-sm md:text-base text-gray-300">
                Crafted for dreamers who love planning beautifully. ✨
            </p>
            
            <p className="text-xs md:text-sm text-gray-500 mt-6">
                © 2025 Planify. All rights reserved.
            </p>
        </div>
    </footer>
  )
}

export default Footer