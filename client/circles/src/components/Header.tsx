import React, { ChangeEvent } from 'react'
import ProfilePicture from './ProfilePicture'
import CreateButton from './Buttons/CreateButton'
import { PiBellThin, PiMusicNotesSimpleLight } from 'react-icons/pi'
import { FiHome } from 'react-icons/fi'
import { PiMagnifyingGlassThin } from 'react-icons/pi'
import CommunityModal from './Modals/CommunityModal'

const Header = () => {
    return (
        <div className='w-full h-20 bg-white border-b border-gray-400 shadow-md flex justify-between items-center px-10 fixed top-0 z-10'>
            <div className='flex justify-center items-center gap-16 relative w-1/3'>
                <h4>Circles</h4>
                <FiHome className="w-7 h-7 text-gray-700" />
                <CommunityModal communitySelectedHeading={'Community'} name={''} handleformChange={function (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
                    throw new Error('Function not implemented.')
                } } value={''}/>
            </div>
            <div className='relative w-1/3 flex justify-center'>
                <input type='text' className='p-3 border-gray-400 border rounded-md outline-none' placeholder='search circles' />
                <PiMagnifyingGlassThin className='absolute right-[31%] top-1/2 w-6 h-6 transform -translate-y-1/2 text-gray-400' />
            </div>
            <div className='w-1/3 flex justify-end gap-4 items-center'>
                <PiBellThin className='w-8 h-8 font-light text-gray-500' />
                <ProfilePicture />
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