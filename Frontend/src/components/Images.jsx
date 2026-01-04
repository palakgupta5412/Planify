import React from 'react'
import { useParams } from 'react-router-dom'

const Images = () => {
    const id = useParams().id;

    const getPlanById = async()=>{
        const response = await axios.get(`/plans/${id}`);
        
    }
  return (
    <div>Images</div>
  )
}

export default Images