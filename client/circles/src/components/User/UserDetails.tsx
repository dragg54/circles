import React from 'react'
import Follows from './Follows'
import ProfilePicture from '../ProfilePicture'

const UserDetails = () => {
  return (
    <div className='h-40 bg-white flex border-b w-full border-gray-300 px-3 mb-4 rounded-md border shadow-md '>
        <div className='w-1/6 h-full p-8 '>
            <ProfilePicture width={20} height={20}/>
        </div>
        <div className='w-5/6 h-full flex flex-col items-start justify-start p-8'>
            <h1 className='font-bold text-3xl'>Krest52</h1>
            <p className="text-gray-700 font-semibold">Seeking for knowledge through exposure to the inevitables...</p>
            <Follows />
        </div>
    </div>
  )
}

export default UserDetails