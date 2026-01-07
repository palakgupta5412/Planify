import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios' ;
import { BiArrowBack } from "react-icons/bi";
import Button from './Button';

const Images = () => {
    const id = useParams().id ;
    const [images , setImages] = React.useState([]) ;
    const [plan , setPlan] = React.useState({}) ;
    const [ selectedImage , setSelectedImage] =  React.useState(null) ;
    const navigate = useNavigate() ;
    useEffect(()=>{
      //fetch images using id
      const getPhotos = async(id)=>{
        const response = await axios.get(`/planify/v1/plans/getPlanById/${id}`);
        const allImages = response.data.data.images || [];
        const plan = response.data.data || {};
        setPlan(plan);
        setImages(allImages);
        console.log("Fetched plan : " , plan );
      }

      getPhotos(id);

    } , []);


  return (
  <div className="min-h-screen px-20 mt-10 flex flex-col">
    <button onClick={() => navigate(-1)}><BiArrowBack className='text-3xl mb-5 text-white hover:text-[#e0b0a0]' /></button>
    <div className="flex items-center gap-5">
      <h1 className="text-xl font-semibold">Images :</h1>
      <p className="text-3xl text-[rgb(223,182,178)] font-bold">{plan.name}</p>
    </div>
    <div><p className='text-sm'>{plan.createdAt} - {plan.completedAt ? plan.completedAt : "Yet To Be Completed"}</p></div>


    <div className="flex mt-10 flex-wrap gap-8">
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

    {selectedImage && (
      <div onClick={()=>setSelectedImage(null)} className='fixed inset-0 z-50 bg-black/10 backdrop-blur-lg flex items-center justify-center'>
        <img
          src={selectedImage}
          alt="Preview"
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />

        <button
          className="absolute -top-10 right-0 text-white text-3xl"
          onClick={() => setSelectedImage(null)}
        >
          ✕
        </button>
      </div>
    )}

  </div>
);

}

export default Images