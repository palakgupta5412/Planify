import React from 'react'

const Button = (props) => {
  return (
    <button className='px-8 py-2 backdrop-blur-md bg-[#DFB6B2]/10 text-[#FAE5D8] border-2 hover:scale-95 cursor-pointer transition ease-in-out duration-200 rounded-3xl text-[#FAE5D8] hover:text-[#DFB6B2] hover:text-semibold'>{props.text}</button>
  )
}

export default Button