import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { RiGroupLine } from 'react-icons/ri'
import { CiSettings } from 'react-icons/ci'
import { TbPremiumRights } from 'react-icons/tb'
import { IoIosHelpCircleOutline } from 'react-icons/io'
import { LiaHandshakeSolid } from 'react-icons/lia'
import { PiSignOutLight } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { UserState } from '../../types/States'
import { closeUserModal } from '../../redux/UserModal'

type userModalState = {
    userModalReducer: boolean
}
const UserModal = () => {
    const openUserModal = useSelector(state => (state as userModalState).userModal)
    const user = useSelector(state => (state as UserState).auth)
    const dispatch = useDispatch()
    function closeModal(){
      dispatch(closeUserModal())
    }
  return (
    <div className={` w-48 h-[460px] bg-white right-32 top-20 fixed ${openUserModal? 'block':'hidden'}`}>
        <ul className='mt-4 flex flex-col items-center text-gray-500'  id='user-settings' >
            <Link className='user-settings' to={`/currentUser/${user.user.id}`} onClick={closeModal}><CgProfile/> Profile</Link>
            <li className='user-settings cursor-pointer'><RiGroupLine/> Communities</li>
            <li className='user-settings cursor-pointer'><CiSettings /> Settings</li>
            <li className='user-settings cursor-pointer'><TbPremiumRights />Go Premium</li>
            <li className='user-settings cursor-pointer'><IoIosHelpCircleOutline /> Help</li>
            <li className='user-settings cursor-pointer'><LiaHandshakeSolid /> Terms</li>
            <li className='user-settings cursor-pointer'><PiSignOutLight />Sign Out</li>
        </ul>
    </div>
  )
}

export default UserModal