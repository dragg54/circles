import React from 'react'
import FollowButton from '../components/Buttons/FollowButton'
import { GET_COMMUNITIES } from '../graphql/queries/community';
import LoadingSpinner from './Loaders/LoadingSpinner';
import { useQuery } from '@apollo/client';
import { commmunityData } from '../data/CommunityData';
import { useSelector } from 'react-redux';
import { UserState } from '../types/States';
import { Link } from 'react-router-dom';
import { Community, CommunityType } from '../types/Community';

const Sidebar = () => {
  const user = useSelector(state => (state as UserState).auth.user)
  const { data: community, error, loading } = useQuery(GET_COMMUNITIES)
  
  if(loading){
    return(
      <LoadingSpinner {...{loading}}/>
    )
  }
  return (
    <div className='min-h-screen col-start-11 relative w-full row-start-2 col-span-2 shadow-md shadow-gray-400 bg-white p-4 flex-col items-start'>
      <div className='fixed mt-28'>
        <h1 className='text-base font-semibold'>COMMUNITIES TO JOIN</h1>

        <ul className='text-sm text-gray-500 leading-10'>
          {
            community && community.communities && (community.communities.filter((cmty: { _id: string; }) => 
            !(user.communities.some(com => (com as CommunityType)
            ._id == cmty._id)))).map((comm: CommunityType)=>{
              return(
                <Link to={`/community/${comm._id}`}><li className='cursor-pointer flex items-center gap-2'>{(commmunityData.find(cmty => cmty.communityName == comm.communityName))?.communityIcon} {comm.communityName}</li></Link>
              )
            })
          }        </ul> 
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