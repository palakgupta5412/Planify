import React , { useEffect, useState } from 'react'
import {useAuth} from '../components/AuthContext.jsx'
import axios from 'axios';
import Button from '../components/Button.jsx';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [plans , setPlans] = useState([]);
  const [completed , setCompleted] = useState([]);

  const categoriesList = ["Food", "Travel", "Experiences", "Places", "Shopping"];
  const counts = plans.reduce((acc, plan) => {
      acc[plan.category] = (acc[plan.category] || 0) + 1;
      return acc;
  }, { Food: 0, Travel: 0, Experiences: 0, Places: 0, Shopping: 0 });

  useEffect(()=>{
    const getPlans = async()=>{
      try {
        const response = await axios.get('/planify/v1/plans/getAllPlans');
        setPlans(response.data.data.plans);
        setCompleted(response.data.data.plans.filter((plan) => plan.isDone));
      } catch (err) {
        toast.error("Failed to fetch stats");
      }
    }
    getPlans();
  },[]);

  if(!user) return null;

  return (
    <div className='p-6 md:p-16 w-full min-h-screen flex flex-col'>
        {/* User Info Header */}
        <div className='w-full flex flex-col md:flex-row justify-start gap-6 md:gap-10 items-center text-center md:text-left'>
            <div className='h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-[#DFB6B2] overflow-hidden shadow-xl'>
                <img src={user.profilePic} alt="pfp" className="w-full h-full object-cover"/>
            </div>
            <div>
                <p className='font-bold text-3xl md:text-5xl text-white'>{user.name}</p>
                <p className='text-[#DFB6B2] text-lg'>{user.email}</p>
                <p className='mt-2 text-zinc-500 text-sm'>User since {user.createdAt?.split("T")[0]}</p>
            </div>
        </div>
        
        {/* Category Stats - GRID FIX */}
        <div className='w-full mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
          <div className='bg-white/5 border-2 border-zinc-500 p-4 rounded-xl flex flex-col items-center justify-center'>
            <p className='text-zinc-400 font-bold text-xs uppercase'>Total Plans</p>
            <p className='text-white text-4xl font-black'>{plans.length}</p>
          </div>
          <div className='border-2 border-red-500 bg-red-500/5 p-4 rounded-xl flex flex-col items-center justify-center'>
            <p className='text-red-500 font-bold text-xs uppercase'>Experiences</p>
            <p className='text-red-500 text-3xl font-black'>{counts.Experiences}</p>
          </div>
          <div className='border-2 border-yellow-300 bg-yellow-300/5 p-4 rounded-xl flex flex-col items-center justify-center'>
            <p className='text-yellow-300 font-bold text-xs uppercase'>Shopping</p>
            <p className='text-yellow-300 text-3xl font-black'>{counts.Shopping}</p>
          </div>
          <div className='border-2 border-cyan-200 bg-cyan-200/5 p-4 rounded-xl flex flex-col items-center justify-center'>
            <p className='text-cyan-200 font-bold text-xs uppercase'>Food</p>
            <p className='text-cyan-200 text-3xl font-black'>{counts.Food}</p>
          </div>
          <div className='border-2 border-green-400 bg-green-400/5 p-4 rounded-xl flex flex-col items-center justify-center'>
            <p className='text-green-400 font-bold text-xs uppercase'>Travel</p>
            <p className='text-green-400 text-3xl font-black'>{counts.Travel}</p>
          </div>
          <div className='border-2 border-teal-300 bg-teal-300/5 p-4 rounded-xl flex flex-col items-center justify-center'>
            <p className='text-teal-300 font-bold text-xs uppercase'>Places</p>
            <p className='text-teal-300 text-3xl font-black'>{counts.Places}</p>
          </div>
        </div>

        {/* Journey Progress - STACK ON MOBILE */}
        <div className='flex flex-col lg:flex-row w-full mt-10 gap-6'>
            <div className='flex-1 flex justify-between items-center p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10'>
              <div>
                <p className='text-zinc-400'>On Your Journey</p>
                <p className='text-2xl font-black text-white leading-tight'>Still To Explore</p>
              </div>
              <p className='text-6xl font-black text-[#DFB6B2]'>{plans.length - completed.length}</p>
            </div>
            <div className='flex-1 flex justify-between items-center p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10'>
              <div>
                <p className='text-zinc-400'>Moments Captured</p>
                <p className='text-2xl font-black text-white leading-tight'>Already Completed</p>
              </div>
              <p className='text-6xl font-black text-green-400'>{completed.length}</p>
            </div>
        </div>

        {/* Actions - RESPONSIVE BUTTONS */}
        <div className='flex flex-wrap md:flex-row justify-center md:justify-end w-full gap-4 mt-16 mb-10'>
          <Button text='Logout' className="bg-zinc-800" />
          <Button text='Change Password' className='bg-blue-600' />
          <Button text='Delete Account' className='bg-red-600' />
        </div>    
    </div>
  )
}
export default Profile