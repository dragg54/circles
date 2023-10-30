import React, { useEffect, useState } from 'react'
import Follows from './Follows'
import ProfilePicture from '../ProfilePicture'
import { useSelector } from 'react-redux'
import { IUser, UserAuth } from '../../types/User'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { GETUSER } from '../../graphql/queries/user'
import { FOLLOW, UNFOLLOW } from '../../graphql/mutations/user'
import { GET_USER_COMMUNITIES } from '../../graphql/queries/community'
import { CommunityType } from '../../types/Community'

type UserState = {
  auth: UserAuth
}

const UserDetails = () => {
  const currentUser = useSelector(state=> (state as UserState).auth)
  const [isFollowing, setIsFollowing] = useState(false)
 const {id} = useParams() 
 const { data: user, loading, error } = useQuery(GETUSER, {
  variables:{
    userId: id
  }
 })
 useEffect(()=>{
  setIsFollowing((user?.user as IUser)?.followers.includes(currentUser.user.id as never))
}, [currentUser, user])

const [followUserMutation, {data: followUserData, error: followUserError, loading: followUserLoading}] = useMutation(FOLLOW)
const [unFollowUserMutation, {data: unFollowUserData, error: unFollowUserError, loading: unFollowUserLoading}] = useMutation(UNFOLLOW)
const {data: userCommunities, error: userCommunitiesError, loading: userCommunitiesLoading} = useQuery(GET_USER_COMMUNITIES, {
  variables:{
    userId: id
  }
})


  // const user = useSelector(state => ((state as UserState).auth.user))
  if(loading || followUserLoading || unFollowUserLoading || userCommunitiesLoading || !id){
    return( <>Loading...</>
    )
  }

  if(error){
    return(<>{error}</>)
  }

  console.log("communities", userCommunities)

  async function follow(){
    if(!isFollowing){
      const resp = await followUserMutation({
        variables:{
          userId: user.user._id
        }
      })
      console.log(resp)
    }
    else{
      const resp =await unFollowUserMutation({
        variables:{
          userId: user.user._id
        }
      })
      console.log(resp)
    }
  }
  
 
  return (
    <div className='h-auto bg-white flex border-b w-full  px-3 mb-4 rounded-md border-b-4 border-l-4 shadow-md border-black'>
        <div className='w-1/6 h-full p-8'>
            <ProfilePicture width={16} height={16} profilePicture={user?.user.profilePic}/>
        </div>
        <div className='w-4/6 h-full flex flex-col items-start justify-start p-8'>
            <h1 className='font-bold text-3xl'>{user?.user.userName}</h1>
            <p className="text-gray-700 font-semibold">Seeking for knowledge through exposure to the inevitables...</p>
            <Follows />
        <ul className='flex gap-3 mt-4 text-gray-500 list-disc'>
          {userCommunities?.userCommunities.map((com: CommunityType)=>{
            return(
              <li key={com._id} className='text-sm'>{com.communityName} <span className={`ml-2 ${userCommunities.userCommunities[userCommunities.userCommunities.length - 1] == com? 'hidden': ''}`}>|</span></li> 
            )
          })}
        </ul>
        </div>
        <div className='flex justify-center items-center'>
          <button onClick={()=>{
            setIsFollowing(!isFollowing)
            follow()
          }} className='rounded-xl px-4 py-2 bg-gray-700 font-semibold text-white text-xs'>{isFollowing?'Following': "Follow"}</button>
        </div>
    </div>
  )
}

export default UserDetails