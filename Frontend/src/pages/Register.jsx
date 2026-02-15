import React, { useRef, useState } from 'react'
import Button from '../components/Button'
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { TbMoodEdit } from "react-icons/tb";
import axios from 'axios';
import toast from 'react-hot-toast'; // IMPORT ADDED

const Register = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    
    const [showPassword, setShowPassword] = useState(false);
    const [pfp, setPfp] = useState(null);
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const logo = 'https://res.cloudinary.com/dc8ryewn6/image/upload/v1768367241/planifyLogo_mzbsuq.png';

    const handlePfpChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Size check for profile pic
      if (file.size > 2 * 1024 * 1024) {
          toast.error("Image size should be less than 2MB");
          return;
      }

      const previewURL = URL.createObjectURL(file);
      setPfp(previewURL);
    };

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent page refresh
        
        if(!name || !email || !password) {
            toast.error("Please fill all required fields");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            if(fileInputRef.current.files[0]) {
                formData.append("pfp", fileInputRef.current.files[0]);
            }
                
            const res = await axios.post("/planify/v1/users/register", formData);
         
            if (res.data.success) {
               toast.success("Account created! Please login.");
               navigate("/login");
            }
        }
        catch(err) {
            toast.error(err?.response?.data?.message || "Registration failed");
        }
    };

  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center p-4 md:p-10'>
        {/* RESPONSIVE BOX: w-full on mobile, fixed width on desktop */}
        <div className='border-2 py-8 flex flex-col justify-start items-center px-6 rounded-xl border-gray-300 w-full sm:w-[450px] backdrop-blur-md bg-white/5 shadow-2xl'>
            
            <div className='w-48 md:w-64 pt-4 mb-4'>
                <img src={logo} alt='logo' className='hover:scale-105 transition ease-in-out duration-300 cursor-pointer' onClick={() => navigate('/')} />
            </div>

            <h1 className='text-white text-xl font-bold mb-6'>Create Account</h1>
            
            <form onSubmit={handleRegister} className='flex items-center flex-col gap-5 w-full'>
                
                {/* Profile Picture Upload Section */}
                <div className='relative group'>
                    <div className='w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#DFB6B2] bg-white/10'>
                        <img
                          src={pfp || 'pfp.png'} // Make sure pfp.png exists in your public folder
                          alt="Profile Preview"
                          className='w-full h-full object-cover'
                        />
                    </div>
                    <div className='absolute bottom-0 right-0 bg-[#DFB6B2] p-1.5 rounded-full text-black shadow-lg cursor-pointer hover:scale-110 transition'>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handlePfpChange}
                          className="hidden"
                        />
                        <TbMoodEdit size={20} onClick={() => fileInputRef.current.click()} />
                    </div>
                </div>

                <div className='w-full space-y-4'>
                    <input 
                        type='text'
                        className='w-full h-11 px-4 rounded-md outline-none bg-white/10 border border-white/10 text-white focus:border-[#DFB6B2] transition-all'
                        placeholder='Full Name'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                    
                    <input 
                        type='email'
                        className='w-full h-11 px-4 rounded-md outline-none bg-white/10 border border-white/10 text-white focus:border-[#DFB6B2] transition-all'
                        placeholder='Email Address'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    <div className='flex justify-between px-4 w-full items-center bg-white/10 border border-white/10 rounded-md focus-within:border-[#DFB6B2] transition-all'>
                        <input 
                            className='w-full h-11 bg-transparent outline-none text-white'
                            type={showPassword ? "text" : "password"}
                            placeholder='Create Password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button type='button' onClick={() => setShowPassword(!showPassword)} className='text-zinc-400 hover:text-white'>
                            {showPassword ? <IoEyeOutline size={20}/> : <IoEyeOffOutline size={20}/>}
                        </button>
                    </div>
                </div>

                <Button className='w-full mt-2' text='Sign Up' type='submit' />
            </form>

            <p className='mt-6 text-sm text-zinc-400'>
                Already have an account? <span onClick={() => navigate('/login')} className='text-[#DFB6B2] font-semibold cursor-pointer hover:underline'>Login</span>
            </p>
        </div>
    </div>
  )
}

export default Register