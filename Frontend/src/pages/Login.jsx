import React from 'react'
import Button from '../components/Button'
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [name , setName] = React.useState('');
    const [email , setEmail] = React.useState('');
    const [password , setPassword] = React.useState('');

    //from AuthContext.jsx we are importing the setUser function so that here in login we can do so 
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const logo =  'https://res.cloudinary.com/dc8ryewn6/image/upload/v1768367241/planifyLogo_mzbsuq.png' ;

    const handleLogin = async () => {
    //   const res = await axios.post("/login", { email, password }, { withCredentials: true });
      
        const res = await axios.post(
          "/planify/v1/users/login",
          { email, password },
        );

      if (res.data.success) { 
        console.log("Logged in user:", res.data.data.user);
        setUser(res.data.data.user);
        navigate("/");
      }

    };

    //bg-gradient-to-b from-[#522959] via-[#824D69] to-[#180018] 
  return (
      <div className='overflow-hidden bg-transparent w-full max-h-screen flex flex-col justify-center items-center p-20'>
          <div className='border-2 h-[88vh] flex flex-col justify-start items-center px-5 rounded-xl border-gray-300 w-1/4 '>
            <div className='w-64 pt-4'>
                <img src={logo} alt='logo' className='bg-cover bg-center hover:scale-105 overflow-hidden transition ease-in-out duration-300' />
            </div>
            <h1 className='text-white text-md'>Login</h1>
            <div className='flex items-center flex-col gap-6 p-1 w-full mt-2'>
                <input 
                    type='name'
                    className='w-full h-8 px-2 rounded-sm outline-none bg-white/10 backdrop-blur-md text-white'
                    placeholder='Enter your Name'
                    onChange={(e) => setName(e.target.value)}
                />
                <input 
                    type='email'
                    className='w-full h-8 px-2 rounded-sm outline-none bg-white/10 backdrop-blur-md text-white'
                    placeholder='Enter your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className='flex justify-between px-2 w-full items-center bg-white/10 backdrop-blur-md text-white'>
                    <input 
                        className='w-full h-8 bg-transparent rounded-sm outline-none '
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter your Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {showPassword ? <IoEyeOutline size={20} onClick={() => setShowPassword(!showPassword)} type='button' className='mr-2'/> : <IoEyeOffOutline size={20} onClick={() => setShowPassword(!showPassword)} type='button' className='mr-2'/>}
                </div>
                <Button className='w-full' text='Login' type='button' onClick={handleLogin} />
            </div>
        </div>
      </div>
    )
}

export default Login
