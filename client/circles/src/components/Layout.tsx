import React from 'react'
import Header from './Header'
import UserModal from './Modals/UserModal'
import { useDispatch } from 'react-redux'
import { closeUserModal, openUserModal } from '../redux/UserModal'
import ResponseModal from './Modals/ResponseModal'

interface ModalTarget extends EventTarget {
  id: string,
  parentNode:{
    id: string
  }
}

const Layout = ({children}: {children: React.ReactNode}) => {
  const dispatch = useDispatch()

  function toggleUserModal(){
    document.addEventListener('click', (e)=>{
      if((e.target as ModalTarget).id == "user-settings" || (e.target as ModalTarget).parentNode.id == "user-settings"){
        dispatch(openUserModal())
      }
      else{
        dispatch(closeUserModal())
      }
    })
  }
  return (
    <div className='w-screen z-30' onClick={()=>{
      toggleUserModal()
    }}>
        <Header/>
        <body className='relative w-screen h-auto justify-center item-center'>
          <ResponseModal message='message'/>
          <UserModal />        
          {children}
        </body>
    </div>
  )
}

export default Layout