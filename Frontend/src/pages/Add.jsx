import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'; // IMPORT ADDED
import Button from '../components/Button'

// Icons
import { IoFastFoodOutline } from "react-icons/io5";
import { TbBrandFunimation, TbPhoto } from "react-icons/tb";
import { RiShoppingCart2Line, RiPlaneLine } from "react-icons/ri";
import { LuNotebookPen } from "react-icons/lu";
import { MdOutlineVideoCameraBack, MdSecurityUpdateGood } from "react-icons/md";
import { BsCameraVideo, BsStar } from "react-icons/bs";
import { GrCalendar } from "react-icons/gr";
import { FaRegClock } from "react-icons/fa";

const Add = () => {
  const { id } = useParams();
  const categories = ["Food", "Experiences", "Travel", "Shopping", "Places"];
  const navigate = useNavigate();
  const MAX_SIZE = 2 * 1024 * 1024;
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [form, setForm] = React.useState({
    name: '',
    description: '',
    category: '',
    images: [],
    createdAt: '',
    completedAt: '',
    isDone: false
  });

  useEffect(() => {
    if (!id) return;
    const loadPlan = async () => {
      try {
        const res = await axios.get(`/planify/v1/plans/getPlanById/${id}`);
        const p = res.data.data;
        setForm({
          name: p.name,
          description: p.description,
          category: p.category,
          createdAt: p.createdAt ? p.createdAt.split('T')[0] : '', // Format for date input
          completedAt: p.completedAt ? p.completedAt.split('T')[0] : '',
          images: p.images || [],
          isDone: p.isDone
        });
        setSelectedCategory(p.category);
      } catch (err) {
        console.error("Error fetching plan:", err);
        toast.error("Failed to load plan details");
      }
    };
    loadPlan();
  }, [id]);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const validFiles = files.filter(file => {
        if (file.size > MAX_SIZE) {
            toast.error(`${file.name} is larger than 2MB`);
            return false;
        }
        return true;
    });
    
    setImages(prev => [...prev, ...validFiles]);
    const previewURLs = validFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...previewURLs]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory) return toast.error("Please select a category");

    const formData = new FormData();
    images.forEach(file => {
      if (file instanceof File) formData.append("images", file);
    });

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", selectedCategory);
    formData.append("createdAt", form.createdAt);
    if (form.completedAt) formData.append("completedAt", form.completedAt);
    formData.append("isDone", form.isDone);

    try {
      if (id) {
        await axios.put(`/planify/v1/plans/editPlan/${id}`, formData, { 
            headers: { "Content-Type": "multipart/form-data" } 
        });
        toast.success("Plan updated successfully! ✨");
      } else {
        await axios.post("/planify/v1/plans/createPlan", formData, { 
            headers: { "Content-Type": "multipart/form-data" } 
        });
        toast.success("Plan created successfully! 🚀");
      }
      navigate("/explore");
    } catch (err) {
      console.error("Submit error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='min-h-screen pb-10 w-full px-4 md:px-20 mt-5 flex justify-center relative overflow-x-hidden'>
      
      {/* Background Icons - Hidden on small screens for better readability */}
      <div className='hidden md:block'>
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
      </div>

      <div className='backdrop-blur-xl bg-white/10 p-6 md:p-10 rounded-xl w-full md:w-3/4 lg:w-1/2 h-full flex flex-col justify-center gap-4 border border-white/10 shadow-2xl z-10'>
        <h2 className='text-xl md:text-2xl text-left font-bold text-white tracking-tight'>
            {id ? "Update your Adventure" : "Let's Planify your next Adventure!!"}
        </h2>
        <p className='text-red-400 text-[10px] md:text-xs uppercase font-bold tracking-widest'> * indicates required fields </p>

        <form onSubmit={handleSubmit} className='h-full flex flex-col gap-5'>
          
          <div className='w-full flex flex-col gap-1'>
            <p className='text-left text-sm font-medium text-zinc-300'>Plan Name<span className='text-red-400'> *</span></p>
            <input 
              type='text' 
              value={form.name}
              placeholder='Enter the plan title here' 
              className='text-white p-3 border border-white/20 bg-black/20 focus:bg-black/40 outline-none transition-all rounded-md w-full'
              required
              onChange={(e)=>setForm({...form, name: e.target.value})}
            />
          </div>

          <div className='w-full flex flex-col gap-1'>
            <p className='text-left text-sm font-medium text-zinc-300'>Description</p>
            <textarea 
              value={form.description}
              placeholder='What are the details?' 
              className='p-3 border border-white/20 bg-black/20 focus:bg-black/40 outline-none transition-all rounded-md w-full h-32 resize-none text-white'
              onChange={(e)=>setForm({...form, description: e.target.value})}
              maxLength={300}
            />
            <p className='text-right text-[10px] text-zinc-400'>{form.description.length}/300</p>
          </div>
          
          <div>
            <p className='text-left text-sm font-medium text-zinc-300 mb-2'>Select Category <span className='text-red-400'> *</span></p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => {setSelectedCategory(cat); setForm({...form, category: cat})}}
                  className={`
                    cursor-pointer px-4 py-1.5 rounded-full border transition-all duration-200 text-xs md:text-sm
                    ${selectedCategory === cat 
                      ? "bg-red-400 border-red-400 text-white font-bold shadow-lg" 
                      : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10"} 
                  `}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>
          
          {/* RESPONSIVE: Stack dates on mobile */}
          <div className='w-full flex flex-col md:flex-row gap-4'>
            <div className='flex flex-col w-full md:w-1/2 gap-1'>
                <p className='text-left text-sm font-medium text-zinc-300'>Creation Date<span className='text-red-400'> *</span></p>
                <input 
                    type='date' 
                    value={form.createdAt}
                    required
                    className='p-3 border border-white/20 bg-black/20 rounded-md text-white outline-none'
                    onChange={(e)=>setForm({...form, createdAt: e.target.value})}
                />
                <label className='flex items-center gap-2 mt-1 text-xs text-zinc-400 cursor-pointer'>
                    <input 
                        type='checkbox'
                        className='accent-red-400'
                        onChange={(e)=>setForm({...form, createdAt: new Date().toISOString().split('T')[0]})}
                    /> Use today's date
                </label>
            </div>

            <div className='flex flex-col w-full md:w-1/2 gap-1'>
                <p className='text-left text-sm font-medium text-zinc-300'>Completion Date</p>
                <input 
                    type='date' 
                    value={form.completedAt}
                    className='p-3 border border-white/20 bg-black/20 rounded-md text-white outline-none'
                    onChange={(e)=>setForm({...form, completedAt: e.target.value})}
                />
                <label className='flex items-center gap-2 mt-1 text-xs text-zinc-400 cursor-pointer'>
                    <input 
                        type='checkbox'
                        className='accent-red-400'
                        onChange={(e)=>setForm({...form, completedAt: new Date().toISOString().split('T')[0]})}
                    /> Use today's date
                </label>
            </div>
          </div>
          
          <div>
            <p className='text-left text-sm font-medium text-zinc-300 mb-2'>Upload Images</p>
              <input 
                type="file" multiple id="fileInput" className="hidden"
                onChange={handleFileSelect}
              />
              <div
                onClick={() => document.getElementById("fileInput").click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="text-zinc-400 w-full h-32 border-2 border-dashed border-white/20 hover:border-white/40 hover:bg-white/5 transition-all rounded-xl flex flex-col items-center justify-center cursor-pointer text-xs p-4 text-center gap-2"
              >
                <TbPhoto size={30} className="opacity-50" />
                Drag & drop or click to upload
              </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {previews.map((src, i) => (
              <img key={i} src={src} className="w-12 h-12 object-cover rounded-md border border-white/20" />
            ))}
          </div>   

          <label className='flex items-center gap-3 text-sm text-zinc-300 cursor-pointer mt-2'>
            <input 
                checked={form.isDone} 
                onChange={(e)=>setForm({...form, isDone: e.target.checked})} 
                type='checkbox' 
                className='w-4 h-4 accent-green-500' 
            /> 
            Mark as completed
          </label>

          <div className='mt-4'>
            <Button type='submit' text={id ? 'Update Plan' : 'Create Plan'} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Add