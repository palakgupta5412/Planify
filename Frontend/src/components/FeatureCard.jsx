import React from 'react'
// Icons imports remains same
import { TbCategory } from "react-icons/tb";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { SiTicktick } from "react-icons/si";
import { IoStatsChartOutline } from "react-icons/io5";
import { PiCameraPlusFill } from "react-icons/pi";
import { LuCalendarDays } from "react-icons/lu";

const FeatureCard = (props) => {
    const { title, description, icon, color } = props;
    // Capitalize Icon to use as component
    const Icon = icon;

    // Fixed color mapping (added fallback logic handled by standard CSS if needed)
    const colorClass = {
      "red-400": "text-red-400",
      "brown-400": "text-amber-700", // brown-400 tailwind me default nahi hota usually, replaced with amber/orange
      "green-400": "text-green-400",
      "yellow-400": "text-yellow-500",
      "purple-400": "text-purple-300",
      "pink-400": "text-pink-300",
      "blue-400": "text-blue-400", // added missing blue
    }[color] || "text-white"; // Fallback

    const bgClass = {
      "red-400": "bg-red-400/10",
      "brown-400": "bg-amber-700/10",
      "green-400": "bg-green-400/10",
      "yellow-400": "bg-yellow-400/10",
      "purple-400": "bg-purple-400/10",
      "pink-400": "bg-pink-400/10",
      "blue-400": "bg-blue-400/10",
    }[color] || "bg-gray-500/10"; // Fallback

  return (
    <div className={`
        relative
        border border-zinc-500 
        flex flex-col justify-between 
        p-6 mt-6 md:mt-10 
        rounded-md 
        shadow-lg backdrop-blur-lg
        
        /* Responsive Width & Height */
        w-full sm:w-72 
        min-h-[18rem] h-auto
        
        /* Smoother Hover */
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-xl
        
        ${bgClass}
    `}>
        {/* Icon Wrapper for better alignment */}
        <div className="mb-4">
            {Icon && <Icon size={50} className={`${colorClass}`}/>}
        </div>

        <div>
            <h3 className={`${colorClass} text-xl font-bold mb-2`}>{title}</h3>
            <p className={`${colorClass} text-sm md:text-base opacity-90 leading-relaxed`}>
                {description}
            </p>
        </div>
    </div>
  )
}

export default FeatureCard