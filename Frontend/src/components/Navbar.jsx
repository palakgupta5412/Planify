import React from 'react'
import { isLoggedIn } from '../store/login';
import { profile } from '../store/login';
import { Link, NavLink } from 'react-router-dom';
import { LuCalendarCheck } from "react-icons/lu";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoKey } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {

    const [isSelected, setIsSelected] = React.useState("Home");
  return (
    <nav className='mb-12 mt-8 flex h-12 items-center max-w-full justify-between mx-12 '>

        <div className='w-1/4 pt-10 '>
            <img src='../public/planifyLogo.png' alt='logo' className='bg-cover bg-center hover:scale-105 overflow-hidden transition ease-in-out duration-300' />
        </div>
        
        <div className='w-1/2 flex justify-center'>
            <div className='flex gap-16'>
                <NavLink 
                    onClick={()=>setIsSelected("Home")} 
                    to="/" 
                    className={`hover:text-white hover:scale-105 overflow-hidden transition ease-in-out duration-300 ${isSelected === "Home" ? " text-white text-md": ""}`}>
                        <a href="#">Home</a>
                </NavLink>
                <NavLink 
                    onClick={()=>setIsSelected("Explore")} 
                    to="/explore" 
                    className={`hover:text-white hover:scale-105 overflow-hidden transition ease-in-out duration-300 ${isSelected === "Explore" ? " text-white text-md": ""}`}>
                        <a href="#">Explore</a>
                </NavLink>
                <NavLink 
                    onClick={()=>setIsSelected("Statistics")} 
                    to="/categories" 
                    className={`hover:text-white hover:scale-105 overflow-hidden transition ease-in-out duration-300 flex items-center text-[#FAE5D8] ${isSelected === "Statistics" ? " text-white": ""}`}>
                        <a href="#">Statistics </a> 
                </NavLink>
                <NavLink 
                    onClick={()=>setIsSelected("Add a new Plan")} 
                    to="/add" 
                    className={`hover:text-white hover:scale-105 overflow-hidden transition ease-in-out duration-300 ${isSelected === "Add a new Plan" ? " text-white": ""}`}>
                        <a href="#">Add a new Plan</a>
                </NavLink>
                <NavLink 
                    to ="/calendar"
                    className='hover:text-white hover:scale-105  transition ease-in-out duration-300'>
                        <div className=' flex flex-col justify-center items-center text-center'>
                            <a className='hover:text-red-400' href="/calendar">
                                <LuCalendarCheck size={26}/>
                            </a>
                        </div>
                </NavLink>
            </div>
        </div>
        
        {isLoggedIn ? (
            <div className='relative inline-block group'>
                
                <img src={profile.pfp} alt="profile" className='cursor-pointer w-8 h-8 rounded-full' />
                
                <div className='cursor-pointer flex flex-col absolute z-50 w-56 right-0 text-xs bg-white/10 backdrop-blur-md rounded-md p-1 shadow-lg mt-2 opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible'>
                    
                    
                    <div className='backdrop-blur-lg pt-3 flex flex-col justify-center items-center w-full shadow-md mb-2'>
                        <img src={profile.pfp} alt="profile" className='mb-3 cursor-pointer w-16 h-16 rounded-full' />
                        <h4 className='font-bold border-1 text-sm border-zinc-900'>{profile.name}</h4>
                        <h4 className='font-bold text-zinc-400 mb-3 border-1 border-zinc-900'>{profile.email}</h4>
                    </div>
                    <div className='flex flex-col gap-1 font-semibold'>
                        <a className='py-1 px-3 w-full backdrop-blur-md text-white text-sm cursor-pointer flex gap-2 items-center'><CgProfile /> View Profile </a>
                        <a className='py-1 px-3 w-full backdrop-blur-md text-white text-sm cursor-pointer flex gap-2 items-center'><IoKey /> Change Password </a>
                        <a><a className='py-1 px-3 w-full backdrop-blur-md text-red-700 text-sm cursor-pointer flex gap-2 items-center'><RiLogoutBoxRLine /> Logout </a></a>
                    </div>
                </div>
            </div>
        ) : (
        <div className='flex gap-3 '>
            <h2 className='hover:text-white hover:scale-105 overflow-hidden text-md transition ease-in-out duration-300 font-semibold py-1 px-3'>Login</h2>
            <h2 className='hover:text-white hover:scale-105 overflow-hidden text-md transition ease-in-out duration-300 font-semibold bg-white/10 py-1 px-3 rounded-md  backdrop-blur-lg'>Signup</h2>
        </div>    
        )}
    </nav>
  )
}

export default Navbar