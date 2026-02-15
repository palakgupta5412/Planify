import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { LuSquareArrowUpRight } from "react-icons/lu";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // IMPORT ADDED

const Gallery = () => {
    const [plans , setPlans] = useState([]);
    const [filteredPlans , setFilteredPlans] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getPlans = async () => {
            try{
                const data = await axios.get('/planify/v1/plans/getAllPlans');
                setPlans(data.data.data.plans);
                setFilteredPlans(data.data.data.plans);
            }
            catch(err){
                console.log("Error in getting plans" , err);
                toast.error("Could not load gallery."); // ERROR TOAST ADDED
                setPlans([]);
                setFilteredPlans([]);
            }
        };
        getPlans();
    }, []);

    useEffect(() => {
        if(!plans) return;
        const filtered = plans.filter((plan) => plan.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredPlans(filtered);
    }, [searchQuery, plans]);

  return (
    // RESPONSIVE: p-10 (desktop) -> p-4 (mobile)
    <div className='w-full min-h-screen p-4 md:p-10'>
        
        {/* Header Section */}
        <div className='flex justify-between items-center mb-8 md:mb-10'>
            <button onClick={() => navigate('/')} className="p-2">
                <BiArrowBack className='text-3xl text-white hover:text-[#e0b0a0] transition-colors' />
            </button>

            {/* SEARCH BAR - Fixed for Mobile */}
            {/* Added 'group' to parent to control input visibility via focus-within */}
            <div className='relative flex items-center justify-end group w-full max-w-[200px] md:max-w-[300px]'>
                <div className='z-20 rounded-full bg-white/10 backdrop-blur-lg p-3 pointer-events-none'>
                    <FaSearch size={20} className="text-white"/>
                </div>
                
                <input 
                    type="text" 
                    placeholder="Search plans..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    id="search"
                    // RESPONSIVE LOGIC:
                    // 1. w-full: Takes available space relative to parent
                    // 2. focus:opacity-100: Ensures it stays visible when typing (for mobile)
                    // 3. peer-hover logic removed/simplified to group-hover for better stability
                    className={`
                        absolute right-0 z-10 
                        bg-white/10 backdrop-blur-md 
                        text-white placeholder-gray-300
                        rounded-full px-10 py-2 outline-none border border-white/20
                        transition-all duration-300 ease-in-out
                        
                        /* Logic: If typing OR hovering OR focusing -> Show Input */
                        ${searchQuery ? 'w-full opacity-100' : 'w-10 opacity-0'}
                        group-hover:w-full group-hover:opacity-100
                        focus:w-full focus:opacity-100
                    `} 
                />
            </div>
        </div>

        {/* GALLERY GRID */}
        {/* RESPONSIVE: 1 col (mobile), 2 cols (tablet), 3 cols (desktop) */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 place-items-center'>
            {filteredPlans.map((plan) => {
                // Image handling safe check
                const bgImage = plan.images?.length ? `url(${plan.images[0]})` : "url('/image.png')"; // fixed path assuming public folder

                return (
                    <div 
                        key={plan._id} // Added key
                        style={{
                            backgroundImage: bgImage, 
                            backgroundSize: "cover", 
                            backgroundPosition: "center", 
                            backgroundRepeat: "no-repeat", 
                        }} 
                        className='
                            relative text-lg 
                            bg-black/50 backdrop-blur-lg 
                            rounded-xl 
                            flex justify-center items-center 
                            h-64 w-full max-w-sm 
                            hover:shadow-2xl hover:scale-[1.02] 
                            transition-all duration-300 
                            group border border-white/10 overflow-hidden
                        '
                    >
                        {/* Dark Overlay for better text readability */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

                        <div className='z-10 opacity-1 px-6 py-2 w-3/4 text-center bg-black/40 backdrop-blur-md border border-white/20 rounded-lg text-white font-semibold tracking-wide shadow-lg'>
                            {plan.name}
                        </div>
                        
                        <button 
                            onClick={() => navigate(`/images/${plan._id}`)} // Replaced window.location with navigate
                            className='z-10 text-zinc-300 hover:text-white flex items-center gap-1 text-xs absolute bottom-3 right-4 transition-colors'
                        >
                            Show More <LuSquareArrowUpRight />
                        </button>
                    </div>
                )
            })}
            
            {filteredPlans.length === 0 && (
                <div className='text-white text-xl col-span-full text-center py-20'>
                    No Plans Found
                </div>
            )}
        </div>
    </div>
  )
}

export default Gallery