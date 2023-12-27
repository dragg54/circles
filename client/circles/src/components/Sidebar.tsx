import React from 'react'
import FollowButton from '../components/Buttons/FollowButton'
import { MdHowToVote, MdOutlineSportsSoccer } from "react-icons/md";
import { GiLoincloth } from "react-icons/gi";
import { BiCameraMovie } from 'react-icons/bi';
import { SiHtmlacademy } from "react-icons/si";

const Sidebar = () => {
  return (
    <div className='min-h-screen col-start-11 relative w-full row-start-2 col-span-2 shadow-md shadow-gray-400 bg-white p-4 flex-col items-start'>
      <div className='fixed mt-28'>
        <h1 className='text-base font-semibold'>COMMUNITIES</h1>
        <ul className='text-sm text-gray-500 leading-10'>
          <li className='flex items-center gap-2'><MdHowToVote className="h-5 w-5"/> Politics <FollowButton type='join'/></li>
          <li className='flex items-center gap-2'><GiLoincloth /> Fashion <FollowButton type='join'/></li>
          <li className='flex items-center gap-2'><BiCameraMovie className="h-5 w-5" /> Movies <FollowButton type='join'/></li>
          <li className='flex items-center gap-2'><SiHtmlacademy className="h-5 w-5" /> Education <FollowButton type='join'/></li>
          <li className='flex items-center gap-2'><MdOutlineSportsSoccer className="h-5 w-5" /> Sport <FollowButton type='join'/></li>
          <li className='mt-4 text-sm font-semibold'>More...</li>
        </ul>
        <h1 className='text-base mt-10 font-semibold'>PEOPLE TO FOLLOW</h1>
        <ul className='text-sm text-gray-500 leading-10'>
          <li className='flex items-center gap-2'><div className='w-8 h-8 rounded-full overflow-hidden'><img src="/images/user1.png" className='w-full h-full' alt="" /></div>Jack Mido <FollowButton type='follow'/></li>
          <li className='flex items-center gap-2'><div className='w-8 h-8 rounded-full overflow-hidden'><img src="/images/user2.jfif" className='w-full h-full' alt="" /></div> Liam Mackson <FollowButton type='follow'/></li>
          <li className='flex items-center gap-2'><div className='w-8 h-8 rounded-full overflow-hidden'><img src="/images/user3.jfif" className='w-full h-full' alt="" /></div> Turk Campot <FollowButton type='follow'/></li>
          <li className='flex items-center gap-2'><div className='w-8 h-8 rounded-full overflow-hidden'><img src="/images/user3.jfif" className='w-full h-full' alt="" /></div>John Cleve <FollowButton type='follow'/></li>
          <li className='mt-4 text-sm font-semibold'>More...</li>
        </ul>
       </div>
       </div>
  )
}

export default Sidebar