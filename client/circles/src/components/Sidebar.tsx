import React from 'react'
import FollowButton from '../components/Buttons/FollowButton'

const Sidebar = () => {
  return (
    <div className='min-h-screen col-start-11 relative w-full row-start-2 col-span-2 shadow-md shadow-gray-400 bg-white p-4 flex-col items-start'>
      <div className='fixed mt-28'>
        <h1 className='text-base font-semibold'>Communities</h1>
        <ul className='text-sm text-gray-500 leading-10'>
          <li className='flex items-center gap-4'>Politics <FollowButton type='join'/></li>
          <li className='flex items-center gap-4'>Fashion <FollowButton type='join'/></li>
          <li className='flex items-center gap-4'>Movies <FollowButton type='join'/></li>
          <li className='flex items-center gap-4'>Education <FollowButton type='join'/></li>
          <li className='flex items-center gap-4'>Sport <FollowButton type='join'/></li>
          <li className='mt-4 text-sm font-semibold'>More...</li>
        </ul>
        <h1 className='text-base mt-10 font-semibold'>People To Follow</h1>
        <ul className='text-sm text-gray-500 leading-10'>
          <li className='flex items-center gap-4'>Jack Mido <FollowButton type='follow'/></li>
          <li className='flex items-center gap-4'>Liam Mackson <FollowButton type='follow'/></li>
          <li className='flex items-center gap-4'>Turk Campot <FollowButton type='follow'/></li>
          <li className='flex items-center gap-4'>John Cleve <FollowButton type='follow'/></li>
          <li className='mt-4 text-sm font-semibold'>More...</li>
        </ul>
       </div>
       </div>
  )
}

export default Sidebar