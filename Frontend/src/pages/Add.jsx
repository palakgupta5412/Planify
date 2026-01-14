import React from 'react'
import { useState , useEffect , } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { IoFastFoodOutline } from "react-icons/io5";
import { TbBrandFunimation } from "react-icons/tb";
import { RiShoppingCart2Line } from "react-icons/ri";
import { LuNotebookPen } from "react-icons/lu";
import { RiPlaneLine } from "react-icons/ri";
import { MdOutlineVideoCameraBack } from "react-icons/md";
import { TbPhoto } from "react-icons/tb";
import { BsCameraVideo } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { GrCalendar } from "react-icons/gr";
import { FaRegClock } from "react-icons/fa";
import { MdSecurityUpdateGood } from "react-icons/md";


const Add = () => {

  const { id } = useParams();
  const categories = ["Food", "Experiences", "Travel", "Shopping" , "Places"] ;
  const navigate = useNavigate();
  const MAX_SIZE = 2 * 1024 * 1024; 
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images , setImages] = useState([]) ;
  const [previews , setPreviews] = useState([]) ;

  const [form , setForm] = React.useState({
    name : '' ,
    description : '' ,
    category : '' ,
    images : [] ,
    createdAt : '' ,
    completedAt : '' ,
    isDone : false
  }) ;

  useEffect(() => {
    if (!id) return; // create mode

    const loadPlan = async () => {
      try {
        const res = await axios.get(`https://planify-7z51.onrender.com/planify/v1/plans/getPlanById/${id}`);
        console.log("Response while fetching plan:", res);
        
        const p = res.data.data;

        setForm({
          name: p.name,
          description: p.description,
          category: p.category,
          createdAt: p.createdAt,
          completedAt: p.completedAt,
          images: p.images || [],
          isDone: p.isDone
        });

        setSelectedCategory(p.category);
        setImages(p.images);
      } catch (err) {
        console.error("Error fetching plan:", err);
      }
    };

    loadPlan();
  }, [id]);

const handleDrop = (e) => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer.files);
  setImages(prev => [...prev , ...files] )
  const previewURLs = files.map(file =>
    URL.createObjectURL(file)
  );
  setPreviews(prev => [...prev, ...previewURLs]);
};

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    images.forEach(file => {
      if (file instanceof File) {
        if (file.size > MAX_SIZE) {
          alert(`${file.name} is larger than 2MB`);
          return;
        }
        formData.append("images", file);
      }
    });

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", selectedCategory);
    formData.append("createdAt", form.createdAt);
    if (form.completedAt) formData.append("completedAt", form.completedAt);
    formData.append("isDone", form.isDone);

    try {
      if (id) {
        // ✅ UPDATE
        await axios.put(
          `/planify/v1/plans/editPlan/${id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Plan updated successfully!");
      } else {
        // ✅ CREATE
        await axios.post(
          "/planify/v1/plans/createPlan",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Plan created successfully!");
      }

      navigate("/explore");
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong");
    }
  };


  const [update , setUpdate] = React.useState(false) ;

  const handleFileSelect = (e) => {

    const files = Array.from(e.target.files);
    setImages(prev => [...prev , ...files] )
    const previewURLs = files.map(file =>
        URL.createObjectURL(file)
    );
    setPreviews(prev => [...prev, ...previewURLs]);
  
  };

  return (
    <div className='min-h-screen pb-10 w-full px-20 mt-5 flex justify-center relative'>
      
      <IoFastFoodOutline size={120} className='-rotate-45 absolute top-10 left-10 opacity-5' />
      <TbBrandFunimation size={120} className='absolute top-72 left-24 opacity-5' />
      <RiShoppingCart2Line size={120} className='absolute top-12 right-44 rotate-6 opacity-5' />
      <LuNotebookPen size={120} className='absolute top-80 right-10 -rotate-12 opacity-5' />
      <RiPlaneLine size={120} className='-rotate-12 absolute bottom-96 left-64 opacity-5' />
      <MdOutlineVideoCameraBack size={120} className='rotate-45 absolute bottom-44 left-10 opacity-5' />
      <TbPhoto size={120} className='rotate-12 absolute bottom-36 right-10 opacity-5' />
      <BsCameraVideo size={120} className='rotate-12 absolute top-1/2 left-1/2 opacity-5' />
      <BsStar size={120} className='-rotate-30 absolute top-28 left-1/4 opacity-5' />
      <GrCalendar size={120} className='rotate-15 absolute bottom-1/3 left-1/3 opacity-5' />
      <FaRegClock size={120} className='-rotate-15 absolute top-64 right-72 font-bold opacity-5' />
      <MdSecurityUpdateGood size={120} className='rotate-0 absolute bottom-80 right-56 opacity-5' />

      <div className='backdrop-blur-md bg-white/10 p-10 rounded-md w-1/2 h-full flex flex-col justify-center gap-4'>
        <h2 className='text-xl text-left font-bold text-white'>Let's Planify your next Adventure!!</h2>
          <p className='text-red-400 text-xs'> * indicates required fields  </p>

        <form onSubmit={handleSubmit}  className='h-full flex flex-col gap-5'>
          
          <div className='w-full flex flex-col gap-0'>
            <p className='text-left m-0 p-0 ' >Plan Name<span className='text-red-400 '> *</span></p>
            <input 
              type='text' 
              name='name' 
              value={form.name}
              placeholder='Enter the plan title here' 
              className='text-gray-300 p-2 border border-gray-300 bg-transparent rounded-md w-full'
              required
              onChange={(e)=>setForm({...form , name : e.target.value})}
            />
          </div>

          <div className='w-full flex flex-col gap-0 mt-4 '>
            <p className='text-left m-0 p-0 ' >Description</p>
            <textarea 
              name='description' 
              value={form.description}
              placeholder='Description' 
              className='p-2 border border-gray-300 bg-transparent rounded-md w-full h-32'
              onChange={(e)=>setForm({...form , description : e.target.value})}
              maxLength={300}
            />
            <p className='text-right text-zinc-400 m-0 p-0'>{form.description.length}/300</p>
          </div>
          
          <div>
            <p className=' text-left m-0 p-0' >Select Category <span className='text-red-400 '> *</span></p>
            <div className="p-2 bg-transparent rounded-md flex flex-wrap gap-2">
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => {setSelectedCategory(cat); setForm({...form , category : cat})}}
                  className={`
                    cursor-pointer px-2 py-1 rounded-full border
                    transition-all duration-200 text-sm

                    ${selectedCategory === cat 
                      ? "bg-[#f49494]  shadow-md font-bold scale-105" 
                      : "bg-transparent text-white"} 
                  `}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>
          
          <div className='w-full flex gap-2 '>
            <div className='flex flex-col w-1/2'>
            <p className='text-left m-0 p-0  ' >Creation Date<span className='text-red-400 '> *</span></p>
            <input 
              type='date' 
              name='createdAt' 
              value={form.createdAt}
              className='p-2 border border-gray-300 bg-transparent rounded-md'
              onChange={(e)=>setForm({...form , createdAt : e.target.value})}
            />
            <div className='flex items-center gap-1 justify-start'>
              <input 
              type = 'checkbox'
              name = 'today date'
              className='rounded-md'
              onChange={(e)=>setForm({...form , createdAt : new Date().toISOString().split('T')[0]})}
            /> Use today's date
            </div>
          </div>

          <div className='flex flex-col w-1/2'>
            <p className='text-left m-0 p-0  ' >Completion Date</p>
            <input 
              type='date' 
              value={form.completedAt}
              name='completedAt' 
              className='p-2 border border-gray-300 bg-transparent rounded-md'
              onChange={(e)=>setForm({...form , completedAt : e.target.value})}
            />
            <div className='flex items-center gap-1 justify-start'>
              <input 
              type = 'checkbox'
              name = 'today date'
              className='rounded-md'
              onChange={(e)=>setForm({...form , completedAt : new Date().toISOString().split('T')[0]})}
            /> Use today's date
            </div>
          </div>
          </div>
          
          <div>
            <p className='text-left m-0 p-0' >Upload Images</p>
              <input 
                type="file" 
                multiple
                id="fileInput"
                className="hidden"
                onChange={handleFileSelect}
              />

              <div
                onClick={() => document.getElementById("fileInput").click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="text-zinc-300 w-full h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center"
              >
                Drag and drop an image here, or click to select a file
              </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-10 h-10 object-cover rounded"
              />
            ))}
          </div>   

          <div>
            <input checked={form.isDone} name='isDone' onChange={(e)=>setForm({...form , isDone : e.target.checked})} type='checkbox' className='mt-4' /> Tick this box if this plan is already completed.
          </div>

          <Button  type='submit' text={id?'Update Plan':'Create Plan'} className='mt-4 w-1/3' />
          {/* <p className='text-red-400 text-xs'> * indicates required fields  </p> */}
        </form>
      </div>
      
    </div>

  )
}

export default Add