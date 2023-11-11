import React from 'react'
import Button from './index'
import { BiPlus } from 'react-icons/bi'

const FollowButton = ({type}:{type: string}) => {
  return (
    <button className='bg-gray-700 text-white flex gap-2 text-xs px-2 p-1 rounded-md font-bold items-center'>
        {type=="join"? "Join": "Follow"}<BiPlus />
    </button>
  )
}

export default FollowButton