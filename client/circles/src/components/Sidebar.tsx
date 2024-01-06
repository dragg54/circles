import React, { useState, useEffect } from 'react'
import FollowButton from '../components/Buttons/FollowButton'
import { GET_COMMUNITIES } from '../graphql/queries/community';
import LoadingSpinner from './Loaders/LoadingSpinner';
import { useQuery } from '@apollo/client';
import { commmunityData } from '../data/CommunityData';
import { useSelector } from 'react-redux';
import { UserState } from '../types/States';
import { Link, useParams } from 'react-router-dom';
import { Community, CommunityType } from '../types/Community';
import JoinButton from './Buttons/JoinButton';
import CommunitySideBar from './CommunitySideBar';

const Sidebar = () => {
  const user = useSelector(state => (state as UserState).auth.user)
  const { data: community, error, loading } = useQuery(GET_COMMUNITIES)
  const [filteredData, setfilteredData] = useState([])
  const [slices, setSlices] = useState({
    start: 0,
    end: 5
  })

  useEffect(() => {
    setfilteredData(community?.communities && (community.communities
      .filter((cmty: { _id: string; }) =>
        !(user.communities
          .some(com => (com as CommunityType)._id == cmty._id))
      )
    )
    )
  }, [community])

  const { id } = useParams()

  if (loading) {
    return (
      <LoadingSpinner {...{ loading }} />
    )
  }

  //check if url follows the community/id pattern
  const currentUrl = window.location.href
  const mtchPattern = new RegExp(`/community/${id}`)

  return (
    <div className='min-h-screen col-start-11 relative w-full row-start-2 col-span-2 shadow-md shadow-gray-400 bg-white p-4 flex-col items-start'>
      <div className='fixed mt-28  w-full'>
        {
          (mtchPattern.test(currentUrl)) ? <CommunitySideBar />
            :
            <div className='w-full flex flex-col'>
              <h1 className='text-base font-semibold'>COMMUNITIES TO JOIN</h1>
              <ul className='text-sm text-gray-500 leading-10 w-[200px] overflow-hidden'>
                {
                  filteredData && filteredData.length && filteredData
                    .slice(slices.start, slices.end)
                    .map((comm: CommunityType) => {
                      return (
                        <div className='flex gap-3 items-center justify-between w-full'>
                          <li className='cursor-pointer flex items-center gap-2'>{(commmunityData.find(cmty => cmty.communityName == comm.communityName))?.communityIcon} {comm.communityName}</li>
                          <JoinButton community={comm} />
                        </div>
                      )
                    })
                }
                {filteredData?.length > 5 ? <li className='cursor-pointer font-semibold' onClick={() => {
                  if (slices.end == 5) {
                    setSlices({
                      start: 0,
                      end: community?.communities.length
                    })
                  }
                  else {
                    setSlices({
                      start: 0,
                      end: 5
                    })
                  }
                }}>
                  {slices.end == community?.communities.length ? "Show Less..." : "More..."}
                </li> : ""}
              </ul>
              <h1 className='text-base mt-6 font-semibold'>PEOPLE TO FOLLOW</h1>
              <ul className='text-sm w-[220px] overflow-hidden flex flex-col text-gray-500 leading-10'>
                <li className='flex justify-between  items-center gap-2'><div className='flex items-center mr-8'><div className='w-8 h-8 rounded-full overflow-hidden'><img src="/images/user1.png" className='w-full h-full' alt="" /></div>Mido</div> <FollowButton type='follow' /></li>
                <li className='flex justify-between items-center gap-2'><div className='flex gap-2 items-center'><div className='w-8 h-8 rounded-full overflow-hidden'><img src="/images/user2.jfif" className='w-full h-full' alt="" /></div> Mackson</div> <FollowButton type='follow' /></li>
                {/* <li className='flex items-center gap-2'><div className='w-8 h-8 rounded-full overflow-hidden'><img src="/images/user3.jfif" className='w-full h-full' alt="" /></div> Turk Campot <FollowButton type='follow'/></li>
          <li className='flex items-center gap-2'><div className='w-8 h-8 rounded-full overflow-hidden'><img src="/images/user3.jfif" className='w-full h-full' alt="" /></div>John Cleve <FollowButton type='follow'/></li>
          <li className='mt-4 text-sm font-semibold'>More...</li> */}
              </ul>
            </div>
        }
      </div>
    </div>
  )
}

export default Sidebar