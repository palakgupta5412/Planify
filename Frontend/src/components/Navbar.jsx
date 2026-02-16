import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LuCalendarCheck } from "react-icons/lu";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { useAuth } from './AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user , setUser } = useAuth();
    const navigate = useNavigate();

    const logo = 'https://res.cloudinary.com/dc8ryewn6/image/upload/v1768367241/planifyLogo_mzbsuq.png' ;
    const [isMenuOpen, setIsMenuOpen] = React.useState(false); 

    const handleLogout = async()=>{
        try {
            await axios.post("/planify/v1/users/logout", {});
            setUser(null);
            toast.success("Logged out");
            navigate("/");
            setIsMenuOpen(false);
        } catch(err) {
            toast.error("Logout failed");
        }
    }

  return (
    <>
        {/* DESKTOP NAV */}
        <nav className='sticky top-0 z-40 bg-black/60 md:bg-white/5 backdrop-blur-xl mb-6 mt-0 md:mt-6 flex items-center justify-between mx-0 md:mx-12 py-4 md:py-3 px-6 md:px-8 md:rounded-2xl border-b md:border border-white/10 shadow-2xl transition-all duration-300'>
            <div className='flex items-center group'>
                <img onClick={()=>navigate('/')} src={logo} alt='logo' className='w-28 md:w-32 cursor-pointer transition-transform duration-300 group-hover:scale-105' />
            </div>

            <div className='hidden md:flex gap-10 items-center font-medium text-sm tracking-wide uppercase'>
                <NavLink to="/" className={({ isActive }) => `transition-colors duration-300 hover:text-white ${isActive ? "text-white" : "text-zinc-400"}`}>Home</NavLink>
                <NavLink to='/explore' className={({ isActive }) => `transition-colors duration-300 hover:text-white ${isActive ? "text-white" : "text-zinc-400"}`}>Explore</NavLink>
                <NavLink to="/gallery" className={({ isActive }) => `transition-colors duration-300 hover:text-white ${isActive ? "text-white" : "text-zinc-400"}`}>Gallery</NavLink>
                <NavLink to="/add" className={({ isActive }) => `transition-colors duration-300 hover:text-white ${isActive ? "text-white" : "text-zinc-400"}`}>Add Plan</NavLink>
                <NavLink to="/calendar" className={({ isActive }) => `transition-all duration-300 hover:scale-125 ${isActive ? "text-red-400" : "text-zinc-400 hover:text-red-400"}`}><LuCalendarCheck size={22}/></NavLink>
                
                {user ? (
                    <div className="relative group/profile">
                        <img src={user.profilePic} className='w-9 h-9 rounded-full border-2 border-white/10 cursor-pointer' alt="pfp" />
                        <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all duration-300">
                            <div className="bg-[#18181b] border border-white/10 w-48 rounded-xl p-2 shadow-2xl">
                                <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg text-xs"><CgProfile /> Profile</Link>
                                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-400/10 rounded-lg text-xs mt-1"><RiLogoutBoxRLine /> Logout</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button onClick={()=>navigate('/login')} className='bg-white text-black px-6 py-2 rounded-full text-xs font-bold shadow-lg shadow-white/5'>LOGIN</button>
                )}
            </div>

            <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-white text-3xl p-1">☰</button>
        </nav>

        {/* MOBILE MENU: FIXED HEIGHT, NO SCROLLING */}
        <div className={`fixed inset-0 z-[999] bg-[#09090b] flex flex-col h-screen overflow-hidden transition-transform duration-500 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
            
            {/* Header: Fixed at top */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 h-[10vh]">
                <span className="text-white font-black text-xl italic">PLANIFY</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-white text-3xl p-2">✕</button>
            </div>

            {/* Nav Items: Centered in the remaining space */}
            <div className="flex flex-col items-center justify-center flex-1 gap-6 text-2xl font-bold text-white uppercase italic">
                <NavLink onClick={() => setIsMenuOpen(false)} to="/">Home</NavLink>
                <NavLink onClick={() => setIsMenuOpen(false)} to="/gallery">Gallery</NavLink>
                <NavLink onClick={() => setIsMenuOpen(false)} to="/add">Add Plan</NavLink>
                <NavLink onClick={() => setIsMenuOpen(false)} to="/calendar" className="flex items-center gap-4 text-red-500"><LuCalendarCheck size={32}/> Calendar</NavLink>
            </div>

            {/* Profile Section: Fixed at bottom */}
            <div className="p-6 border-t border-white/5 h-[25vh] flex flex-col justify-center">
                {user ? (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl">
                            <img src={user.profilePic} className="w-12 h-12 rounded-full border border-white/10" alt="user" />
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-bold text-base truncate">{user.name}</p>
                                <p className="text-zinc-500 text-xs truncate">{user.email}</p>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="w-full bg-red-600/20 text-red-500 py-3 rounded-xl font-bold text-center">LOGOUT</button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <button onClick={()=>{navigate('/login'); setIsMenuOpen(false)}} className="w-full bg-white text-black py-3 rounded-xl font-black">LOGIN</button>
                        <button onClick={()=>{navigate('/register'); setIsMenuOpen(false)}} className="w-full border border-white/20 text-white py-3 rounded-xl font-black">SIGNUP</button>
                    </div>
                )}
            </div>
        </div>
    </>
  )
}

export default Navbar