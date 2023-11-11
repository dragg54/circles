import React from 'react'


const ProfilePicture = ({width, height, profilePicture, id}:{width: number, height: number, profilePicture: string, id: string}) => {
  return (
    <div className={`w-12 h-12 rounded-full object-cover overflow-hidden flex justify-center items-center cursor-pointer`} >
        <img src={'http://'+profilePicture} className='w-full h-full rounded-full' id={id} alt="" />
    </div>
  )
}

export default ProfilePicture