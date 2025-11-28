import React from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
import { isLoggedIn } from '../store/login';
import { profile } from '../store/login';

const Navbar = () => {
  return (
    <nav className=' flex h-12 items-center max-w-full justify-between mx-12 '>

        <div className='w-1/4 pt-10 '>
            <img src='../public/planifyLogo.png' alt='logo' className='bg-cover bg-center hover:scale-105 overflow-hidden transition ease-in-out duration-300' />
        </div>
        
        <div className='w-1/2 flex justify-center'>
            <ul className='flex gap-16'>
                <li className='hover:text-white hover:scale-105 overflow-hidden transition ease-in-out duration-300'><a href="#">Explore</a></li>
                <li className='hover:text-white hover:scale-105 overflow-hidden transition ease-in-out duration-300 flex items-center text-[#FAE5D8]'><a href="#">Categories </a> <RiArrowDropDownLine size={32}  /> </li>
                <li className='hover:text-white hover:scale-105 overflow-hidden transition ease-in-out duration-300'><a href="#">Add a new Plan</a></li>
            </ul>
        </div>

        
        {isLoggedIn ? (<div className='flex gap-2 items-center backdrop-blur-md bg-white/10 border border-white/10 rounded-3xl cursor-pointer hover:scale-105 px-4 py-2 b-2 justify-end'>
            <div className='w-8 rounded-full overflow-hidden'>
                <img src={profile.pfp} alt='logo' className='bg-cover bg-center' />
            </div>
            <h2>{profile.name}</h2>
        </div>) : (<h2 className='hover:text-white hover:scale-105 overflow-hidden text-xl transition ease-in-out duration-300 font-semibold'>Signup</h2>)}

    </nav>
  )
}

export default Navbar