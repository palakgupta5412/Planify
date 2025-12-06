import React from 'react'
import { TbCategory } from "react-icons/tb";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { SiTicktick } from "react-icons/si";
import { IoStatsChartOutline } from "react-icons/io5";
import { PiCameraPlusFill } from "react-icons/pi";
import { LuCalendarDays } from "react-icons/lu";

const FeatureCard = (props) => {
    const { title, description, icon, color } = props;
    const Icon = icon;


    const colorClass = {
      "red-400": "text-red-400",
      "brown-400": "text-brown-400",
      "green-400": "text-green-400",
      "yellow-400": "text-yellow-500",
      "purple-400": "text-purple-300",
      "pink-400": "text-pink-300",
    }[color];

    const bgClass = {
      "red-400": "bg-red-400/10",
      "blue-400": "bg-blue-400/10",
      "green-400": "bg-green-400/10",
      "yellow-400": "bg-yellow-400/10",
      "purple-400": "bg-purple-400/10",
      "pink-400": "bg-pink-400/10",
    }[color];

  return (
    <div className={`border-1 hover:scale-110 transition-all duration-300 ease-in-out border-zinc-500 flex shadow-lg flex-col justify-around p-6 mt-10 rounded-md w-72 ${bgClass} backdrop-blur-lg h-72`}>
        <Icon size={50} className={`${colorClass}`}/>
        <h3 className={`${colorClass} text-xl font-bold mt-4`}>{title}</h3>
        <p className={`${colorClass} mt-4`}>{description}</p>
    </div>
  )
}

export default FeatureCard