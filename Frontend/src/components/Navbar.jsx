import React from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
import { isLoggedIn } from '../store/login';
import { profile } from '../store/login';
import { plans } from '../store/plans';
import { CiHeart } from "react-icons/ci";
import { Link, NavLink } from 'react-router-dom';
const Navbar = () => {

    const [isSelected, setIsSelected] = React.useState("Explore");
  return (
    <nav className='mb-12 mt-8 flex h-12 items-center max-w-full justify-between mx-12 '>

        <div className='w-1/4 pt-10 '>
            <img src='../public/planifyLogo.png' alt='logo' className='bg-cover bg-center hover:scale-105 overflow-hidden transition ease-in-out duration-300' />
        </div>
        
        <div className='w-1/2 flex justify-center'>
            <div className='flex gap-16'>
                <NavLink onClick={()=>setIsSelected("Explore")} to="/" className={`hover:text-white hover:scale-105 overflow-hidden transition ease-in-out duration-300 ${isSelected === "Explore" ? "underline text-white text-md": ""}`}><a href="#">Explore</a></NavLink>
                <NavLink onClick={()=>setIsSelected("Statistics")} to="/categories" className={`hover:text-white hover:scale-105 overflow-hidden transition ease-in-out duration-300 flex items-center text-[#FAE5D8] ${isSelected === "Statistics" ? "underline text-white": ""}`}><a href="#">Statistics </a> </NavLink>
                <NavLink onClick={()=>setIsSelected("Add a new Plan")} to="/add" className={`hover:text-white hover:scale-105 overflow-hidden transition ease-in-out duration-300 ${isSelected === "Add a new Plan" ? "underline text-white": ""}`}><a href="#">Add a new Plan</a></NavLink>
                <NavLink className='hover:text-white hover:scale-105 overflow-hidden transition ease-in-out duration-300'><a className='hover:text-red-500' href="#"><CiHeart size={26}/></a></NavLink>
            </div>
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