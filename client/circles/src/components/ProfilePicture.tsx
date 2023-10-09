import React from 'react'

const ProfilePicture = () => {
  return (
    <div className='w-12 h-12 rounded-full object-cover overflow-hidden flex justify-center items-center cursor-pointer' >
        <img src="images/pp.jpg" className='w-10 h-10 rounded-full' id='user-setting' alt="" />
    </div>
  )
}

export default ProfilePicture