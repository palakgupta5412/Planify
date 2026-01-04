import React from 'react'

const Button = ({text,onClick,type}) => {
  return (
    <button type={type} onClick={onClick} className='px-8 py-2 backdrop-blur-md bg-[#DFB6B2]/10 text-[#FAE5D8] border-2 hover:scale-95 cursor-pointer transition ease-in-out duration-200 rounded-3xl hover:text-[#DFB6B2] hover:text-semibold'>{text}</button>
  )
}

export default Button