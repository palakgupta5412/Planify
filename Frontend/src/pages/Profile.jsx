import React , { useEffect } from 'react'
import {useAuth} from '../components/AuthContext.jsx'
import axios from 'axios';
import Button from '../components/Button.jsx';
const Profile = () => {

  const { user } = useAuth();
  const [plans , setPlans] = React.useState([]);
  const [completed , setCompleted] = React.useState([]);

  const counts = plans.reduce(
    (acc, plan) => {
      acc[plan.category] = (acc[plan.category] || 0) + 1;
      return acc;
    },
    {
      Food: 0,
      Travel: 0,
      Experiences: 0,
      Places: 0,
      Shopping: 0
    }
  );

  useEffect(()=>{
    const getPlans = async()=>{
      const response = await axios.get('/planify/v1/plans/getAllPlans');
      setPlans(response.data.data.plans);

      const completedPlans = response.data.data.plans.filter((plan) => plan.isDone);
      setCompleted(completedPlans);     

    }

    getPlans();

  },[]);

  return (
    <div className='p-16 w-full min-h-screen flex flex-col justify-start items-start'>
        

        <div className='w-full h-20 flex justify-start gap-10 items-center'>
            <div className='h-full overflow-hidden w-20 rounded-full bg-center bg-cover'><img src={user.profilePic} /></div>
            <div>
                <p className='font-bold text-3xl '>{user.name}</p>
                <p className='text-red-300'>{user.email}</p>
            </div>
        </div>
        <p className='pl-1 mt-4 text-zinc-400'>User since {user.createdAt.split("T")[0]}</p>
        
        <div className='w-full h-[20vh mt-8 rounded-lg px-10 flex items-center mb-5 justify-evenly'>
          {/* <div className='border-2 border-orange-400 w-16 flex flex-col justify-center items-center h-16'>
            <p className='text-orange-400 font-bold'>All</p>
            <p className='text-orange-400 text-2xl font-black'>{plans.length}</p>
          </div> */}



          <div className='border-2 border-red-500 w-24 flex flex-col justify-center items-center h-16'>
            <p className='text-red-500 font-bold'>Experience</p>
            <p className='text-red-500 text-2xl font-black'>{counts.Experiences}</p>
          </div>

          <div className='border-2 border-yellow-300 w-24 flex flex-col justify-center items-center h-16'>
            <p className='text-yellow-300 font-bold'>Shopping</p>
            <p className='text-yellow-300 text-2xl font-black'>{counts.Shopping}</p>
          </div>

          <div>
            <p className='text-2xl font-black text-center'>Total</p>
            <p className='text-6xl font-black text-center'>{plans.length}</p>
          </div>

          <div className='border-2 border-cyan-200 w-16 flex flex-col justify-center items-center h-16'>
            <p className='text-cyan-200 font-bold'>Food</p>
            <p className='text-cyan-200 text-2xl font-black'>{counts.Food}</p>
          </div>

          <div className='border-2 border-green-400 w-16 flex flex-col justify-center items-center h-16'>
            <p className='text-green-400 font-bold'>Travel</p>
            <p className='text-green-400 text-2xl font-black'>{counts.Travel}</p>
          </div>
          <div className='border-2 border-teal-300 w-16 flex flex-col justify-center items-center h-16'>
            <p className='text-teal-300 font-bold'>Places</p>
            <p className='text-teal-300 text-2xl font-black'>{counts.Places}</p>
          </div>

          
        </div>
        <div className='flex px-10 w-full h-1/2 mt-10 gap-10'>
            <div className='hover:bg-white/20 h-1/2 w-1/2 flex justify-center items-center gap-2 px-6 py-8 rounded-lg bg-white/10 backdrop-blur-lg'>
              <div className='w-2/3 h-full pl-8'>
                <p className='text-lg font-semibold'>On Your Journey </p>
                <p className='text-3xl font-black'>Still To Explore</p>
              </div>
              <div className='flex flex-col w-1/3 text-center'>
                <p className='text-6xl font-black'>{plans.length - completed.length}</p>
                <p className='text-sm'>plans</p>
              </div>
            </div>
            <div className='hover:bg-white/20 h-1/2 w-1/2 flex justify-center items-center gap-2 px-6 py-8 rounded-lg bg-white/10 backdrop-blur-lg'>
              <div className='w-2/3 h-full pl-8'>
                <p className='text-lg font-semibold'>Moments you have </p>
                <p className='text-3xl font-black'>Already Completed</p>
              </div>
              <div className='flex flex-col w-1/3 text-center'>
                <p className='text-6xl font-black'>{completed.length}</p>
                <p className='text-sm'>plans</p>
              </div>
            </div>
        </div>

        <div className='flex justify-end w-full gap-4 mt-20 pr-10'>
          <Button text='Logout' />
          <Button text='Delete Account'  className='mt-4 bg-red-600 hover:bg-red-700'/>
          <Button text='Change Password' className='mt-4 bg-blue-600 hover:bg-blue-700'/>
        </div>    
    </div>
  )
}

export default Profile