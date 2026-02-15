import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios' ;
import { BiArrowBack } from "react-icons/bi";
import Button from './Button';
import toast from 'react-hot-toast'; // IMPORT ADDED

const Images = () => {
    const id = useParams().id ;
    const [images , setImages] = React.useState([]) ;
    const [plan , setPlan] = React.useState({}) ;
    const [ selectedImage , setSelectedImage] =  React.useState(null) ;
    const navigate = useNavigate() ;

    useEffect(()=>{
      const getPhotos = async(id)=>{
        try {
            const response = await axios.get(`/planify/v1/plans/getPlanById/${id}`);
            const allImages = response.data.data.images || [];
            const planData = response.data.data || {};
            setPlan(planData);
            setImages(allImages);
        } catch (error) {
            console.error("Error fetching images:", error);
            toast.error("Failed to load images"); // ERROR TOAST ADDED
        }
      }

      getPhotos(id);
    } , [id]); // Added id to dependency array


  return (
  // RESPONSIVE: px-20 -> px-6 md:px-20
  <div className="min-h-screen px-6 md:px-20 mt-10 flex flex-col">
    <button onClick={() => navigate(-1)}><BiArrowBack className='text-3xl mb-5 text-white hover:text-[#e0b0a0]' /></button>
    
    {/* RESPONSIVE: flex-col on mobile to prevent text overlap */}
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-5">
      <h1 className="text-xl font-semibold text-white">Images :</h1>
      <p className="text-2xl md:text-3xl text-[rgb(223,182,178)] font-bold break-words">{plan.name}</p>
    </div>
    
    <div>
        <p className='text-xs md:text-sm text-gray-400'>
            {plan.createdAt} - {plan.completedAt ? plan.completedAt : "Yet To Be Completed"}
        </p>
    </div>


    {/* RESPONSIVE: justify-center for better mobile viewing */}
    <div className="flex mt-10 flex-wrap gap-8 justify-center md:justify-start mb-10">
      {images.length > 0 ? images.map((image, index) => (
        <div
          onClick={() => setSelectedImage(image)}
          key={index}
          className="
            bg-white 
            p-3 
            pb-10 
            w-[260px] 
            rounded-sm 
            shadow-xl 
            hover:scale-105  
            transition-all 
            cursor-pointer
            ease-in-out
            duration-300"
        >
          
          <div className="w-full h-[220px] overflow-hidden bg-black">
            <img
              src={image}
              alt={`Image ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )) : <div className='text-white text-xl'>No Images Found</div>  }
    </div>

    {/* OVERLAY: Improved for mobile touch */}
    {selectedImage && (
      <div 
        onClick={()=>setSelectedImage(null)} 
        className='fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4'
      >
        <div className="relative max-w-full max-h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl border-4 border-white"
            />

            <button
              className="absolute -top-12 right-0 md:-right-10 text-white text-4xl hover:text-red-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ✕
            </button>
        </div>
      </div>
    )}

  </div>
);

}

export default Images