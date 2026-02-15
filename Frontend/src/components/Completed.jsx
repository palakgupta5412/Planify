import React, { useEffect, useState } from 'react'
import { MdTwoWheeler } from "react-icons/md";
import axios from 'axios'; // Note: Agar aapke paas axiosConfig hai to wahan se import karein
import toast from 'react-hot-toast'; // IMPORT ADDED

const Completed = () => {

    const [percentage, setPercentage] = useState(0);
    const [plans , setPlans] = useState([]);

    useEffect(()=>{
        
        const getPlans = async () => {
            try{
                // Make sure your backend URL is correct (localhost vs production)
                const res = await axios.get('/planify/v1/plans/getAllPlans');
                setPlans(res.data.data.plans);
            }
            catch(err){
                console.log("Error in getting plans" , err);
                toast.error("Failed to load progress stats"); // ERROR TOAST ADDED
                setPlans([]);
            }
        };

        getPlans();

    },[]);


    useEffect(() => {
        if (!Array.isArray(plans) || plans.length === 0) {
            setPercentage(0);
            return;
        }

        const total = plans.length;
        const completed = plans.filter((plan) => plan.isDone === true).length;

        // Prevent NaN if total is 0
        const calcPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);
        setPercentage(calcPercentage);
    }, [plans]);
    
  return (
    <div className='mt-10 z-10 w-full h-auto py-8 md:h-[20vh] flex flex-col justify-center items-center'>
        {/* RESPONSIVE: Width increased on mobile (90vw), text size adjusted */}
        <h3 className='flex items-left w-[90vw] md:w-[80vw] pb-4 md:pb-2 text-lg md:text-xl font-semibold text-white'>
            {`You have completed ${percentage}% of your plans`}
        </h3>

        {/* RESPONSIVE: px-6 on mobile (was px-20 which is too big), px-20 on desktop */}
        <div className='rounded-md flex flex-col justify-center items-center backdrop-blur-md bg-white/10 w-[90vw] md:w-[80vw] h-24 md:h-[20vh] px-6 md:px-20 shadow-lg border border-white/10'>
            
            <div className='h-[3px] bg-white/30 w-full rounded-full'>
                <div 
                    style={{ width: `${percentage}%` }} 
                    className={`transition-all duration-700 ease-in h-[3px] bg-[#2A114B] flex justify-end relative rounded-full`}
                >
                    {/* Icon position tweaked to be absolutely safe */}
                    <div className='absolute -top-[13px] -right-[10px] animate-glow text-2xl h-8 w-8 flex items-center justify-center glow rounded-full text-[#2A114B] bg-white shadow-sm'>
                        <MdTwoWheeler className="text-lg" />
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Completed