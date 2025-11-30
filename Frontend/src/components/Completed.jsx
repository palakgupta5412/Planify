import React, { useEffect } from 'react'
import { plans } from '../store/plans'
import { useState } from 'react'
import { FaPlane } from "react-icons/fa";
import { MdTwoWheeler } from "react-icons/md";

const Completed = () => {

    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const calculatePercentage = () => {
            const total = plans.length;
            const completed = plans.filter((plan) => plan.isDone === true).length;
            setPercentage(Math.round((completed / total) * 100));
        };

        calculatePercentage();
    }, [])

    console.log(plans);
    console.log(percentage);

  return (
    <div className='w-full h-[20vh] flex flex-col justify-center items-center'>
        <h3 className='flex items-left w-[80vw] pb-2 text-xl'>{`You have completed ${percentage}% of your plans`}</h3>
        <div className='rounded-md flex flex-col justify-center items-center backdrop-blur-md bg-white/10 w-[80vw] h-[20vh] px-20'>
            <div className='h-[3px] bg-white w-full'>
                <div style={{ width: `${percentage}%` }} className={`transition-all duration-700 ease-in h-[3px] bg-[#2A114B] flex justify-end`}>
                    <div className=' animate-glow relative -top-[15px] left-[8px] text-2xl h-2 w-2 glow rounded-full text-[#2A114B]'><MdTwoWheeler /></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Completed