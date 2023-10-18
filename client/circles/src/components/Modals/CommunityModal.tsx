import { useQuery } from '@apollo/client'
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { GET_USER_COMMUNITIES } from '../../graphql/queries/community'
import { CommunityType } from '../../types/Community'
import { useDispatch } from 'react-redux'
import { fetchPosts } from '../../redux/Post'
import { PostState } from '../../types/States'
import { PostCommunity } from '../../types/IPost'

interface SelectTarget extends EventTarget
{
    value: string
}

export const CommunityModal = ({communitySelectedHeading, handleSelectCommunity, name, handleformChange, value}: {communitySelectedHeading: string, handleSelectCommunity:(e: SyntheticEvent<HTMLSelectElement, Event>)=> void, name: string, handleformChange:(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=> void, value: string}) => {
    const [communityId, setCommunityId] = useState("")
    const {data:community, error , loading} = useQuery(GET_USER_COMMUNITIES,
        {
            variables: [communityId]
        })
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(fetchPosts({posts: (community?.allCommunityPosts as PostState[]), community:communityId}))
    }, [communityId])
    if(!loading && !error){
        return (
            <div className="relative inline-block w-64">
            <select onSelect={(e: SyntheticEvent<HTMLSelectElement, Event>) =>handleSelectCommunity(e)} className="text-gray-400 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" value={value} onChange={(e)=>handleformChange(e)} name={name}>
                <option value="">{communitySelectedHeading}</option>
                {community.userCommunities.map((comm: CommunityType)=>{
                    return(
                        <option key={comm._id} value = {comm._id}>{comm.communityName}</option>
                    )
                })}
                {communitySelectedHeading == "Community"? <option> Create Community</option>: ""}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-7 text-gray-500 w-7 mb-3 font-light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M8.293 11.293a1 1 0 011.414 0L12 13.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" /></svg>
            </div>
        </div>
    )
    }
    else if(loading){
        return <p>Loading...</p>
    }
    else{
        return <p>Something happened</p>
    }
}
export default CommunityModal