import React from 'react'
import { RiUserAddFill } from 'react-icons/ri'
import { check } from '../../redux/User'

const FollowButton = ({type}:{type: string}) => {
  return (
    <button onClick={()=>{
    }} className='bg-gray-700 text-white flex gap-2 text-xs px-2 p-1 rounded-md font-bold items-center'>
       <RiUserAddFill /> {type=="join"? "Join": "Follow"}
    </button>
  )
}

export default FollowButton