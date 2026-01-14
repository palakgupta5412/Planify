import React from 'react'
import Button from '../components/Button'
import { IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { TbMoodEdit } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";

import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [pfp, setPfp] = React.useState(null);
    const fileInputRef = React.useRef(null);

    const logo = 'https://res.cloudinary.com/dc8ryewn6/image/upload/v1768367241/planifyLogo_mzbsuq.png' ;

    const [name , setName] = React.useState('');
    const [email , setEmail] = React.useState('');
    const [password , setPassword] = React.useState('');
     
    const handlePfpChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const previewURL = URL.createObjectURL(file);
      setPfp(previewURL);
    };

    const handleRegister = async () => {
        try{
            const formData = new FormData();
             formData.append("name", name);
             formData.append("email", email);
             formData.append("password", password);
             formData.append("pfp", fileInputRef.current.files[0]);
                
             const res = await axios.post(
               "/planify/v1/users/register",
               formData,
             );
         
             if (res.data.success) {
               alert("Registered successfully!");
               navigate("/login");   // 👈 NOT home
            }
        }
        catch(err){
            alert(err?.response?.data?.message)
        }
    };


  return (
    <div className='overflow-hidden w-full min-h-screen flex flex-col justify-center items-center p-10'>
        <div className='border-2 h-[88vh] flex flex-col justify-start items-center px-5 rounded-xl border-gray-300 w-1/4 '>
            <div className='w-64 pt-4'>
                <img src={logo} alt='logo' className='bg-cover bg-center hover:scale-105 overflow-hidden transition ease-in-out duration-300' />
            </div>
            <h1 className='text-white text-md'>Register / Sign Up</h1>
            <div className='flex items-center flex-col gap-6 p-1 w-full mt-2'>
                <div className='relative rounded-full w-16 bg-white/10'>
                    <div className='z-10 w-16 h-16 rounded-full overflow-hidden'>
                        <img
                          src={pfp || 'pfp.png'}
                          className='bg-cover bg-center w-16 h-16 rounded-full'
                        />
                        {/* <img src='pfp.png' className='bg-cover bg-center overflow-hidden transition ease-in-out duration-300'/> */}
                    </div>
                    <div className='text-white absolute -bottom-1 right-0 z-50'>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handlePfpChange}
                          className="hidden"
                        />

                        <button type='button' onClick={() => fileInputRef.current.click()}> <TbMoodEdit /> </button>
                       
                    </div>
                </div>
                <input 
                    type='name'
                    className='w-full h-8 px-2 rounded-sm outline-none bg-white/10 backdrop-blur-md text-white'
                    placeholder='Enter your Name'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <input 
                    type='email'
                    className='w-full h-8 px-2 rounded-sm outline-none bg-white/10 backdrop-blur-md text-white'
                    placeholder='Enter your Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <div className='flex justify-between px-2 w-full items-center bg-white/10 backdrop-blur-md text-white'>
                    <input 
                        className='w-full h-8 bg-transparent rounded-sm outline-none '
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter your Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {showPassword ? <IoEyeOutline size={20} onClick={() => setShowPassword(!showPassword)} type='button' className='mr-2'/> : <IoEyeOffOutline size={20} onClick={() => setShowPassword(!showPassword)} type='button' className='mr-2'/>}
                </div>
                <Button className='w-full' text='Register' type='button' onClick={handleRegister} />
            </div>
            <p className=' text-xs text-zinc-400'>Already have an account? <span onClick={() => {navigate('/login')}} className='text-[#DFB6B2] hover:text-white cursor-pointer'>Login</span></p>
        </div>
    </div>
  )
}

export default Register