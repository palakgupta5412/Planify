import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { LuSquareArrowUpRight } from "react-icons/lu";

const Gallery = () => {
    const [plans , setPlans] = useState([]);
    const [filteredPlans , setFilteredPlans] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const getPlans = async () => {
            try{
                const data = await axios.get('/planify/v1/plans/getAllPlans');
                setPlans(data.data.data.plans);
                setFilteredPlans(data.data.data.plans);
            }
            catch(err){
                console.log("Error in getting plans" , err);
                setPlans([]);
                setFilteredPlans([]);
            }
        };
        getPlans();
    }, []);

    useEffect(() => {
        const filtered = plans.filter((plan) => plan.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredPlans(filtered);

    }, [searchQuery]);

  return (
    <div className='w-full min-h-screen p-10 '>
        
        <div className='relative px-3 flex justify-end mb-10 ml-5'>
            <div className=' flex peer items-center z-20 rounded-full bg-white/10 backdrop-blur-lg p-4'>
                <FaSearch size={30}/>
            </div>
            <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="search"
                className={`absolute right-12 z-10 top-2 outline-none opacity-0 w-0 peer-hover:w-1/2 peer-hover:opacity-100 hover:w-1/2 rounded-lg hover:opacity-100 transition-all duration-300 px-3 text-lg flex bg-white/10 backdrop-blur-lg h-10`} 
            />
        </div>

        <div className='flex flex-wrap gap-10 justify-center'>
        {filteredPlans.map((plan)=>{
            return (
                <div style={{backgroundImage: plan.images?.length ? `url(${plan?.images[0]})` : "../public/image.png" , backgroundSize: "cover" , backgroundPosition: "center" , backdropFilter: "blur(100px)"  , backgroundRepeat: "no-repeat" , backgroundBlendMode: "darken" }} className='relative text-lg  bg-black/50 bg- backdrop-blur-lg rounded-lg flex justify-center items-center h-64 w-96 hover:bg-white/10 group'>
                    <div className='opacity-1 px-6 py-2 w-3/4 text-center bg-white/30 backdrop-blur-lg text-white'>
                        {plan.name}
                    </div>
                    <button onClick={() => window.location.href = `/images/${plan._id}`} className='text-zinc-500 flex items-center gap-1 text-xs absolute bottom-2 right-2 group-hover:text-zinc-400'>Show More <LuSquareArrowUpRight /></button>
                </div>
            )
        })}{filteredPlans.length === 0 ? <div className='text-white text-xl'>No Plans Found</div> : null}
        </div>
    </div>
  )
}

export default Gallery