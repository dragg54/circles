import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
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
import { useQuery } from '@apollo/client'
import { GET_USER_COMMUNITIES } from '../graphql/queries/community'

const Header = () => {
    interface SelectTarget extends EventTarget {
        value: string
    }
    const [communityId, setCommunityId] = useState("")

    const { data: community, error, loading } = useQuery(GET_USER_COMMUNITIES)
    const dispatch = useDispatch()
    function handleSelectCommunity(e: SyntheticEvent<HTMLSelectElement, Event>) {
        e.preventDefault()
        setCommunityId((e.target as SelectTarget).value)
        dispatch(fetchPosts({ posts: (community?.allCommunityPosts as PostState[]), community: (e.target as SelectTarget).value }))
    }
    if(loading){
        return <p>Loading...</p>
    }
    console
    return (
        <div className='w-full h-20 bg-white border-b border-gray-400 shadow-md flex justify-between items-center px-10 fixed top-0 z-10'>
            <div className='flex justify-center items-center gap-16 relative w-1/3'>
                <h4>Circles</h4>
                <FiHome className="w-7 h-7 text-gray-700" />
                <CommunityModal handleSelectCommunity={handleSelectCommunity} communitySelectedHeading={'Community'} name={''} handleformChange={function (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>): void {
                    handleSelectCommunity(e)
                }} value={''} />
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

// const CommunityList = () => {
//     const communities = ["Politics", "Music", "Sport", "Entertainment", "Tech", "Business", "Education", "Movie"]
//     return (
//         <div>
//             {communities.map((community: string) => {
//                 return (
//                     <div className='width-full p-3 bg-white'>
//                         <p>{community}</p>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

export default Header