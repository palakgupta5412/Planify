import React from 'react'
import { FaPenToSquare } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer class="mt-8 w-full py-8 flex justify-center px-20 items-center">
        <div className='flex flex-col justify-center items-center'>
            <h2 class="text-xl font-semibold text-white">Planify</h2>
            <p>Crafted for dreamers who love planning beautifully. ✨</p>
            <p class="text-center text-gray-500 mt-6">© 2025 Planify. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer