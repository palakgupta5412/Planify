import React, { useState } from 'react'
import { plans } from '../store/plans'
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const categories = ["All" , "Food" , "Experiences" , "Travel" , "Places" , "Shopping"]

const lanscape = ['../public/Grid/1.jpg' , '../public/Grid/5.jpg' , '../public/Grid/7.jpg' , '../public/Grid/2.jpg' ]
const portrait = ['../public/Grid/3.jpg' , '../public/Grid/4.jpg' , '../public/Grid/6.jpg' , '../public/Grid/8.jpg' ]
 
const Hero = () => {
    
    const [ active , setActive] = useState("All");

  return (
    <div className='w-full grayscale min-h-screen flex gap-8 pt-24 px-16 '>
        {/* <div></div>  */}
        <div className='w-full min-h-screen flex flex-col gap-2'>

            <div className='flex gap-2 '>
                {categories.map((category)=>{
                    return (
                        <div onClick={()=>{setActive(category)}}  className={`${category==active ? "bg-zinc-400 text-white rounded-sm" : "rounded-md"} backdrop-blur-md bg-[#DFB6B2]/10 cursor-pointer bg-white/10 px-3 py-1`}>
                            <h2>{category}</h2>
                        </div>
                    )
                })}
            </div>
            <div className='flex flex-col gap-2 border-2 w-full p-1 border-zinc-400 rounded-md'>
                {plans.map((plan)=>{
                    if(plan.category == active || active == "All")
                    return (
                        <div className={`hover:bg-white/20 flex justify-between backdrop-blur-md bg-white/10 px-8 py-4 rounded-md`}>
                            <div className=''>
                                <h2 className='text-lg font-semibold'>{plan.name}<span className={`text-white ml-1 text-[2px] ${active == "All" ? "" : "hidden"}`}>{`(${plan.category})`}</span></h2>
                                <p className='text-sm text-zinc-300'>{plan.description}</p>
                            </div>
                            <div className='flex items-center gap-3 text-xl'>
                                <button className='hover:text-white hover:font-bold'>
                                    <CiEdit />
                                </button>
                                <button onClick={()=>{deletePlan(plan.id)}} className='hover:text-white hover:font-bold'>
                                    <AiOutlineDelete />
                                </button>
                                <button className='hover:text-white hover:font-extrabold'>
                                    <IoCheckmarkDoneOutline />
                                </button>
                            </div>
                        </div>
            )})}
            </div>
        </div>
    </div>
  )
}

export default Hero