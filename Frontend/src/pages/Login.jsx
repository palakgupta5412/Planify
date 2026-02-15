import React from 'react'
import Button from '../components/Button'
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import toast from 'react-hot-toast'; // IMPORTED

const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [email , setEmail] = React.useState('');
    const [password , setPassword] = React.useState('');
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const logo = 'https://res.cloudinary.com/dc8ryewn6/image/upload/v1768367241/planifyLogo_mzbsuq.png' ;

    const handleLogin = async () => {
        try {
            const res = await axios.post("/planify/v1/users/login", { email, password });
            if (res.data.success) { 
                toast.success("Welcome back! 👋");
                setUser(res.data.data.user);
                navigate("/");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

  return (
      <div className='min-h-screen w-full flex flex-col justify-center items-center px-4'>
          {/* RESPONSIVE WIDTH: w-full on mobile, 1/4 on desktop */}
          <div className='border-2 py-10 flex flex-col justify-center items-center px-6 rounded-xl border-gray-300 w-full sm:w-[400px] backdrop-blur-md bg-white/5'>
            <div className='w-48 mb-6'>
                <img src={logo} alt='logo' className='hover:scale-105 transition duration-300 cursor-pointer' onClick={() => navigate('/')} />
            </div>
            <h1 className='text-white text-xl font-bold mb-6'>Login</h1>
            <div className='flex flex-col gap-5 w-full'>
                <input 
                    type='email'
                    className='w-full h-11 px-4 rounded-md outline-none bg-white/10 border border-white/10 text-white focus:border-[#DFB6B2] transition-all'
                    placeholder='Enter your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className='flex justify-between px-4 w-full items-center bg-white/10 border border-white/10 rounded-md focus-within:border-[#DFB6B2] transition-all'>
                    <input 
                        className='w-full h-11 bg-transparent outline-none text-white'
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter your Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='button' onClick={() => setShowPassword(!showPassword)} className='text-zinc-400 hover:text-white'>
                        {showPassword ? <IoEyeOutline size={20}/> : <IoEyeOffOutline size={20}/>}
                    </button>
                </div>
                <Button className='w-full mt-2' text='Login' onClick={handleLogin} />
                <p className='text-center text-sm text-zinc-400 mt-2'>
                    Don't have an account? <span onClick={() => navigate('/register')} className='text-[#DFB6B2] cursor-pointer hover:underline'>Register</span>
                </p>
            </div>
        </div>
      </div>
    )
}
export default Login