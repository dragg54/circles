import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import ProfilePicture from './ProfilePicture'
import CreateButton from './Buttons/CreateButton'
import { PiBellThin, PiMusicNotesSimpleLight } from 'react-icons/pi'
import { FiHome } from 'react-icons/fi'
import { PiMagnifyingGlassThin } from 'react-icons/pi'
import CommunityModal from './Modals/CommunityModal'
import { fetchPosts } from '../redux/Post'
import { PostState } from '../types/States'
import { PostCommunity } from '../types/IPost'
import { useDispatch } from 'react-redux'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_USER_COMMUNITIES } from '../graphql/queries/community'
import { GET_ALL_POSTS } from '../graphql/queries/post'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    interface SelectTarget extends EventTarget {
        value: string
    }
    const [communityValue, setComunityValue ] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { data: community, error, loading } = useQuery(GET_USER_COMMUNITIES)
    
    async function handleCommunityChange(e:ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>){
        setComunityValue(e.target.value)
        try{
            if(!postLoading && !postError){
                const response = await getPosts({variables: {
                    community: [e.target.value]
                }})
                
                dispatch(fetchPosts({posts: response.data.allCommunityPosts}))
            }
        }  
        catch(err){
            console.log(err)
        }      
    }


    
    const [getPosts, {error: postError, loading: postLoading}] = useLazyQuery(GET_ALL_POSTS)

    if(loading){
        return <p>Loading...</p>
    }
    return (
        <div className='w-full h-20 bg-white border-b border-gray-400 shadow-md flex justify-between items-center px-10 fixed top-0 z-10'>
            <div className='flex justify-center items-center gap-16 relative w-1/3'>
                <h4>Circles</h4>
                <FiHome className="w-7 h-7 text-gray-700" />
                <CommunityModal value={communityValue}  communitySelectedHeading={'Community'} name={''} handleformChange={function (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>): void {
                    handleCommunityChange(e)
                }} />
            </div>
            <div className='relative w-1/3 flex justify-center'>
                <input type='text' className='p-3 border-gray-400 border rounded-md outline-none' placeholder='search circles' />
                <PiMagnifyingGlassThin className='absolute right-[31%] top-1/2 w-6 h-6 transform -translate-y-1/2 text-gray-400' />
            </div>
            <div className='w-1/3 flex justify-end gap-4 items-center'>
                <PiBellThin className='w-8 h-8 font-light text-gray-500' />
                <ProfilePicture height={12} width={12} />
                <CreateButton />
            </div>
        </div>
    )
}

export default Header