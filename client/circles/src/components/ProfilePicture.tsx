import React from 'react'


const ProfilePicture = ({width, height, profilePicture}:{width: number, height: number, profilePicture: string}) => {
  return (
    <div className={`w-${width} h-${height} rounded-full object-cover overflow-hidden flex justify-center items-center cursor-pointer`} >
        <img src={'http://'+profilePicture} className='w-full h-full rounded-full' id='user-settings' alt="" />
    </div>
  )
}

export default ProfilePicture