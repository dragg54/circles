import React from 'react'
import { FaRegUser } from "react-icons/fa";



const ProfilePicture = ({width, height, profilePicture, id}:{width: number, height: number, profilePicture: string, id: string}) => {

  const AlternativeImage = () =>{
    return(
      <div className='w-full h-full border border-gray-400 flex justify-center items-end rounded-full bg-black'>
        <FaRegUser className="h-[70%] w-[70%] text-white" id={id}/>
      </div>
    )
  }
  return (
    <div className={`w-${width} h-${height} rounded-full object-cover overflow-hidden flex justify-center items-center cursor-pointer`} >
        {profilePicture ? <img src={profilePicture && 'http://'+profilePicture} className='w-full h-full rounded-full' id={id} alt="" />:<AlternativeImage />}
    </div>
  )
}

export default ProfilePicture