import React from 'react'
import Header from './Header'
import UserModal from './Modals/UserModal'
import { useDispatch } from 'react-redux'
import { closeUserModal, openUserModal } from '../redux/UserModal'
import ResponseModal from './Modals/ResponseModal'
import Sidebar from './Sidebar'

interface ModalTarget extends EventTarget {
  id: string,
  parentNode: {
    id: string
  }
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()

  function toggleUserModal() {
    document.addEventListener('click', (e) => {
      if ((e.target as ModalTarget).id == "user-settings" || (e.target as ModalTarget).parentNode.id == "user-settings") {
        dispatch(openUserModal())
      }
      else {
        dispatch(closeUserModal())
      }
    })
  }
  return (
    <div className='w-screen relative  z-30 grid grid-cols-12' onClick={() => {
      toggleUserModal()
    }}>
      <Header />
      <Sidebar />
      <div className='relative flex col-start-3  row-start-2 col-span-6 justify-center item-center'>
        <ResponseModal message='message' />
        <UserModal />
        {children}
      </div>
    </div>
  )
}

export default Layout