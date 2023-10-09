import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { RiGroupLine } from 'react-icons/ri'
import { CiSettings } from 'react-icons/ci'
import { TbPremiumRights } from 'react-icons/tb'
import { IoIosHelpCircleOutline } from 'react-icons/io'
import { LiaHandshakeSolid } from 'react-icons/lia'
import { PiSignOutLight } from 'react-icons/pi'
import { useSelector } from 'react-redux'

type userModalState = {
    userModalReducer: boolean
}
const UserModal = () => {
    const openUserModal = useSelector(state => (state as userModalState).userModal)
    console.log(openUserModal)
  return (
    <div id='user-modal' className={` w-48 h-[460px] bg-white right-32 top-20 fixed ${openUserModal? 'block':'hidden'}`}>
        <ul className='mt-4 flex flex-col items-center text-gray-500'>
            <li className='user-settings'><CgProfile/> Profile</li>
            <li className='user-settings'><RiGroupLine/> Communities</li>
            <li className='user-settings'><CiSettings /> Settings</li>
            <li className='user-settings'><TbPremiumRights />Go Premium</li>
            <li className='user-settings'><IoIosHelpCircleOutline /> Help</li>
            <li className='user-settings'><LiaHandshakeSolid /> Terms</li>
            <li className='user-settings'><PiSignOutLight />Sign Out</li>
        </ul>
    </div>
  )
}

export default UserModal