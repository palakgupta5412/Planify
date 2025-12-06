import { IoFastFoodOutline } from "react-icons/io5";
import { IoIosDoneAll } from "react-icons/io";
import { TbBrandFunimation } from "react-icons/tb";
import { IoCarOutline } from "react-icons/io5";
import { MdOutlinePlace } from "react-icons/md";
import { RiShoppingCart2Line } from "react-icons/ri";

const categories = [
    {
        id: 1, name : "All", icon : IoIosDoneAll
    }, 
    {
        id:2 , name : "Food" , icon : IoFastFoodOutline
    } , 
    {
        id:3 , name : "Experiences" , icon : TbBrandFunimation
    } , 
    {
        id:4 , name : "Travel" , icon : IoCarOutline
    }, 
    {
        id: 5 , name : "Places" , icon : MdOutlinePlace
    } , 
    {
        id:6 , name : "Shopping" , icon : RiShoppingCart2Line
    }
]


export default categories;