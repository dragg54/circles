/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CommunityType } from '../types/Community'
import { FaUsers } from 'react-icons/fa'
import { UserState } from '../types/States'
import { commmunityData } from '../data/CommunityData'
import { JOIN_COMMUNITIES, LEAVE_COMMUNITY } from '../graphql/mutations/community'
import { useMutation, useQuery } from '@apollo/client'
import { check, joinCommunity, leaveCommunity } from '../redux/Auth'
import { GET_COMMUNITY } from '../graphql/queries/community'
import LoadingSpinner from './Loaders/LoadingSpinner'

const CommunitySideBar = () => {
    const {id} = useParams()
    const {data: currentCommunity, error:communityError, loading: communityLoading} = useQuery(GET_COMMUNITY,{
      variables:{
        id
      }
    })
    const [joinCommunityMutation, {loading, error}] = useMutation(JOIN_COMMUNITIES)
    const [leaveCommunityMutation, {loading: leaveLoading, error:leaveError}] = useMutation(LEAVE_COMMUNITY)
    const dispatch = useDispatch()
    const currentUser = useSelector(state => (state as UserState).auth.user)
    const [joined, setJoined] = useState(null)

    useEffect(()=>{
      setJoined(checkMembership())
    }, [currentCommunity])
     

    if(communityLoading){
      return <LoadingSpinner loading={communityLoading}/>
    }

    function checkMembership():boolean{
      return currentUser.communities
      .map((comm: CommunityType) => comm._id)
      .includes(currentCommunity?.community._id)
  }

    function handleSave(){
      try{
      if(joined){
           leaveCommunityMutation({
               variables:{
                   communityId: currentCommunity?.community._id
               }
           })
           if(!leaveError){
            setJoined(false)
              dispatch(leaveCommunity({community: currentCommunity?.community}))
           }
       }

       else{
           joinCommunityMutation({
               variables: {
                   communities: [currentCommunity?.community?._id],
               }
           })
       }
       if(!error){
             setJoined(true)
           dispatch(joinCommunity({community: currentCommunity?.community}))
       }
   }
      catch(err){
       console.log(err)
      }
   }

  return (
    <div className='w-1/6 h-full  pr-6'>
        <h1 className='text-lg font-bold inline-flex gap-3 items-center'>{((commmunityData as unknown[]).find((comm: CommunityType) => comm.communityName == currentCommunity?.community?.communityName))?.communityIcon}{currentCommunity?.community.communityName}</h1>
        <div className='w-full object-cover h-40 rounded-md shadow-sm shadow-gray-400 overflow-hidden mt-3'>
          <img className='h-full w-full' src={`/images/${currentCommunity?.community?.communityName}.jpg`} alt="" />
        </div>
        <h3 className='mt-4 inline-flex items-center gap-3 text-lg mb-3'>{<FaUsers />} {currentCommunity?.community?.communityMembers?.length} Members</h3>
        <button onClick={()=>handleSave()} className='bg-orange-500 shadow-sm shadow-orange-300 rounded-sm text-white w-full text-sm font-bold py-2 '>{joined? "Leave Community": "Join Community"}</button>
        <p className='mt-3 text-sm'>{currentCommunity?.community?.communityDescription}</p>
    </div>
  )
}

export default CommunitySideBar