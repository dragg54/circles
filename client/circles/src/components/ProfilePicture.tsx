import React from 'react'

const ProfilePicture = ({width, height}:{width: number, height: number}) => {
  return (
    <div className={`w-${width} h-${height} rounded-full object-contain bg-red-500 overflow-hidden flex justify-center items-center cursor-pointer`} >
        <img src="images/pp.jpg" className='w-full h-full' id='user-settings' alt="" />
    </div>
  )
}

export default ProfilePicture