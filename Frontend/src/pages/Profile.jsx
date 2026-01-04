import React from 'react'
import { profile } from '../store/login'
const Profile = () => {
  return (
    <div className='p-16 w-full min-h-screen flex flex-col justify-start items-start'>
        <div className='w-full h-20 flex justify-start gap-20 items-center'>
            <div className='h-full overflow-hidden w-20 rounded-full bg-cover'><img src={`../public/${profile.pfp}`} /></div>
            <div>
                <p>{profile.name}</p>
                <p>{profile.email}</p>
            </div>
        </div>
    </div>
  )
}

export default Profile