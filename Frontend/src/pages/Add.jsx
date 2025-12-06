import React from 'react'
import { Form, Outlet } from 'react-router-dom'
import Button from '../components/Button'

const Add = () => {
  return (
    <div className='h-screen w-full p-1'>

      <div className="p-10 max-h-screen w-full h-full  bg-[size:40px_40px]">
        <div className='relative w-full h-full flex flex-col gap-10 justify-start items-start'>
          <div className='h-1/3 w-full flex justify-between gap-10 '>
            <div className='w-1/2 h-full border-2 border-[#DFB6B2] rounded-md py-4 px-8 flex flex-col gap-2 justify-center'>
              <h2 className='text-lg font-semibold'>What are you excited to do next?</h2>
              <input type="text" placeholder='Type here...' className='p-1 w-full backdrop-blur-md bg-white/5 h-10' />
            </div>
            <div className='w-1/2 h-full border-2 border-[#DFB6B2] rounded-md py-4 px-8 flex flex-col gap-2 justify-center'>
              <h2 className='text-lg font-semibold'>Where does this plan belong?</h2>
              <select id="category"
              className="w-full px-4 py-2 bg-transparent text-[#FAE5D8] border-b-2 border-white/5 outline-none focus:border-[#A8A8A8] appearance-none"
              >
                <option value="" disabled selected className="text-black bg-[#FAE5D8]">
                  Select category
                </option>
                <option value="food" className="text-black bg-[#FAE5D8] hover:bg-[#DFB6B2]">Food</option>
                <option value="places" className="text-black bg-[#FAE5D8] hover:bg-[#DFB6B2]">Places</option>
                <option value="shopping" className="text-black bg-[#FAE5D8]">Shopping</option>
                <option value="activities" className="text-black bg-[#FAE5D8]">Experiences</option>
                <option value="travel" className="text-black bg-[#FAE5D8]">Travel</option>
              </select>
            </div>
          </div>
          <div className='h-1/3 w-full flex justify-between gap-10'>
            <div className='w-1/2 h-full border-2 border-[#DFB6B2] rounded-md py-4 px-8 flex flex-col gap-2 justify-center '>
              <h2 className='text-lg font-semibold'>Tell more about it...</h2>
              <textarea type="text" placeholder='Type here...' className='resize-none p-1 w-full h-full bg-transparent backdrop-blur-md bg-white/5 h-10' />
            </div>
            <div className='w-1/2 h-full border-2 border-[#DFB6B2] rounded-md py-4 px-8 flex flex-col gap-2 justify-center'>
              <h2 className='text-lg font-semibold'>Is this moment already lived?</h2>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="pending"
                  className="accent-[#FAE5D8]"
                />
              To be done
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="completed"
                  className="accent-[#FAE5D8]"
                />
                Done
              </label>
            </div>
          </div>
          <div className='w-28 rounded-full bg-contain absolute top-36  left-[43vw]'>
            <img src='../public/plan.png' />
          </div>
          <div className='w-full flex justify-between items-center '>
            <Button text="Save New Plan"/>
          </div>
        </div>
      </div>

    </div>

  )
}

export default Add