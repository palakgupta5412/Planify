import React, { useState } from 'react'
import { CiEdit } from "react-icons/ci";
// import { fetchPlans } from '../store/plans'; // Kept commented as in your code
import { AiOutlineDelete } from "react-icons/ai";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoIosDoneAll } from "react-icons/io";
import { TbBrandFunimation } from "react-icons/tb";
import { IoCarOutline } from "react-icons/io5";
import { MdOutlinePlace } from "react-icons/md";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useEffect } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import axios from 'axios';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // IMPORT ADDED

const Hero = () => {

    const navigate = useNavigate();
    
    const [ active , setActive] = useState("All");
    const categories = ["All" , "Food" , "Experiences" , "Travel" , "Places" , "Shopping"]

    const [plans, setPlans] = useState([]);
    const [filterStatus , setFilterStatus] = useState("All");
    // const [filteredPlans , setFilteredPlans] = useState([...plans]) ;

    useEffect(() => {
        const getPlans = async () => {
            try{
                const data = await axios.get('/planify/v1/plans/getAllPlans');
                setPlans(data.data.data.plans);
            }
            catch(err){
                console.log("Error in getting plans" , err);
                toast.error("Error fetching plans"); // ADDED TOAST
                setPlans([]);
            }
        };
        getPlans();
    }, []);

    const categoryImage = (category) => {
        if(category == "Food") return IoFastFoodOutline;
        else if(category == "Experiences") return TbBrandFunimation;
        else if(category == "Travel") return IoCarOutline;
        else if(category == "Places") return MdOutlinePlace;
        else if(category == "Shopping") return RiShoppingCart2Line;
    }

    const filteredPlans = 
    plans.filter(plan => {
        if (filterStatus === "Completed") return plan.isDone === true;
        if (filterStatus === "Not Completed") return plan.isDone === false;
        return true;
    });

    const deletePlan = async (id) => {
        try {
            await axios.delete(`/planify/v1/plans/deletePlan/${id}`);
            setPlans(prev => prev.filter(plan => plan._id !== id));
            toast.success("Plan Deleted Successfully"); // CHANGED ALERT TO TOAST
        } catch (error) {
            console.error("Error deleting plan:" , error);
            toast.error("Failed to delete plan"); // ADDED ERROR TOAST
        }
    }

    const donePlan = async (id) => {
        try {
            const res = await axios.patch(`/planify/v1/plans/markAsDone/${id}`);

            setPlans(prev =>
                prev.map(p =>
                    p._id === id ? { ...p, isDone: true } : p
                )
            );
            toast.success("Plan marked as done!"); // CHANGED ALERT TO TOAST
            return res;
        } catch (error) {
            console.error("Error marking plan as done:", error);
            toast.error("Failed to update status"); // ADDED ERROR TOAST
        }
    }

    const deleteAllPlans = async () => {
        try {
            await axios.delete(`/planify/v1/plans/deleteAllPlans`);
            setPlans([]);
            toast.success("All Plans Deleted Successfully"); // CHANGED ALERT TO TOAST
        } catch (error) {
            console.error("Error deleting all plans:", error);
            toast.error("Failed to delete all plans"); // ADDED ERROR TOAST
        }
    }

    

  return (
    // RESPONSIVE: px-16 -> px-4 md:px-16 (Mobile padding fix)
    <div className='w-full mb-10 grayscale min-h-screen gap-8 pt-20 px-4 md:px-16 '>
        <div className='w-full flex flex-col gap-2 mb-10 '>

            <div >
                {/* RESPONSIVE: flex-row -> flex-col md:flex-row (Stack on mobile) */}
                <div className='flex flex-col md:flex-row justify-between gap-4 md:gap-0'>
                    {/* RESPONSIVE: added flex-wrap so categories don't overflow */}
                    <div className='flex gap-2 flex-wrap'>
                        {categories.map((category)=>{
                        return (
                            <div onClick={()=>{setActive(category)}}  className={`${category==active ? "bg-zinc-400 text-white rounded-sm" : "rounded-md"} backdrop-blur-md cursor-pointer bg-white/10 px-3 py-1`}>
                                <h2>{category} (
                                    {category === "All" ? 
                                    plans.length : 
                                    plans.filter(plan => plan.category.includes(category)).length})
                                </h2>
                            </div>
                        )
                        })}
                    </div>
                    <div className='flex gap-2 justify-start md:justify-center items-center' >
                        <select onChange={(e)=>setFilterStatus(e.target.value)} className='backdrop-blur-md bg-white/10 text-white text-center px-1 py-1 rounded-md'>
                            <option 
                                className='text-black bg-white/10 backdrop-blur-lg ' 
                                value="All"
                            >
                                Sort by Status
                            </option>

                            <option 
                                className='text-black bg-white/10 backdrop-blur-lg ' 
                                value="Completed"
                            >
                                Completed
                            </option>
                            
                            <option 
                                className='text-black bg-white/10 backdrop-blur-lg ' 
                                value="Not Completed"
                            >
                                Not Completed
                            </option>

                        </select>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2 border-2 w-full p-1 border-zinc-400 rounded-md'>
                {filteredPlans.map((plan)=>{
                    const Icon = categoryImage(plan.category);
                    if(plan.category == active || active == "All")
                    return (
                        // RESPONSIVE: flex-col on mobile, flex-row on desktop. px-8 -> px-4 md:px-8
                        <div key={plan._id} className={`hover:bg-white/20 flex flex-col md:flex-row justify-between backdrop-blur-md bg-white/10 px-4 md:px-8 py-4 rounded-md items-start md:items-center gap-4 md:gap-0`}>
                            {/* RESPONSIVE: w-1/2 -> w-full md:w-1/2 */}
                            <div className='w-full md:w-1/2'>
                                <h2 className='text-lg font-semibold'>{plan.name}<span className={`text-white ml-1 text-[2px] ${active == "All" ? "" : "hidden"}`}>{`(${plan.category})`}</span></h2>
                                <p className='text-sm text-zinc-300'>{plan.description}</p>
                            </div>
                            {/* RESPONSIVE: hidden on mobile if you want, or keep it. Added md:block logic to align icon */}
                            <div className='hidden md:flex h-full justify-center items-center'><Icon size={24}/></div>
                            
                            {/* RESPONSIVE: w-full flex justify-end on mobile */}
                            <div className='flex items-center gap-3 text-xl w-full md:w-auto justify-end'>
                                <button onClick={()=>navigate(`/add/${plan._id}`)} className='hover:text-white hover:font-bold'>
                                    <CiEdit />
                                </button>
                                <button onClick={()=>{deletePlan(plan._id)}} className='hover:text-white hover:font-bold'>
                                    <AiOutlineDelete />
                                </button>
                                <button  onClick={()=>donePlan(plan._id)}  className='hover:text-white hover:font-extrabold'>
                                    <IoCheckmarkDoneOutline />
                                </button>
                            </div>
                        </div>
            )})}
            </div>
        
        </div>
        {/* RESPONSIVE: flex-col on mobile for buttons */}
        <div className='w-full flex flex-col md:flex-row justify-end gap-4 mt-10'>
            <Button text="Delete All Plans" onClick={deleteAllPlans}/>
            <Button text="Add new Plan" onClick={()=>(navigate("/add"))}/>
        </div>
        <div className='h-10 w-full flex justify-center mt-10 text-xl font-sans items-center'>
            ~ {plans.length} plans created so far - Keep Going!! ❤️ ~
        </div>
    </div>
  )
}

export default Hero