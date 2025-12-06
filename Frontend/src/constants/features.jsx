import { TbCategory } from "react-icons/tb";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { SiTicktick } from "react-icons/si";
import { IoStatsChartOutline } from "react-icons/io5";
import { PiCameraPlusFill } from "react-icons/pi";
import { LuCalendarDays } from "react-icons/lu";

const features = [
    {
        id: 1,
        title : "Smart Category" ,
        description : "Organize every plan across Food, Experiences, Travel, Places, Shopping, and more — neatly grouped and easy to explore.",
        icon : TbCategory,
        color : "red-400"
    },
    {
        id: 2,
        title : "Add Plans Instantly" ,
        description : "Capture ideas as they come — add details, set moods, choose categories, and customize each plan beautifully.",
        icon : RiStickyNoteAddLine ,
        red : "brown-400"
    },
    {
        id: 3,
        title : "Tick & Complete" ,
        description : "Mark plans as completed, celebrate progress, and watch your journey unfold.",
        icon : SiTicktick,
        color : "green-400"

    },
    {
        id: 4,
        title : "Insightful Statistics" ,
        description : "See completion rates, category trends, and personal progress visualized cleanly.",
        icon : IoStatsChartOutline ,
        color : "yellow-400"
    },
    {
        id: 5,
        title : "Add Visuals" ,
        description : "Upload photos that reflect your experiences and make your plans more memorable.",
        icon : PiCameraPlusFill ,
        color : "purple-400"
    },
    {
        id: 6,
        title : "Calendar View" ,
        description : "Track your plans by date with a visual calendar marked with category icons.",
        icon : LuCalendarDays ,
        color : "pink-400"
    }
]

export default features;

