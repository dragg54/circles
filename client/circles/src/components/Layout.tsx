import React from 'react'
import Header from './Header'
import User from './Modals/UserModal'
import UserModal from './Modals/UserModal'
import { useDispatch } from 'react-redux'
import { closeUserModal, openUserModal } from '../redux/UserModal'

interface ModalTarget extends EventTarget {
  id: string
}

const Layout = ({children}: {children: React.ReactNode}) => {
  const dispatch = useDispatch()

  function toggleModal(){
    document.addEventListener('click', (e)=>{
      if((e.target as ModalTarget)!.id !== "user-setting"){
        console.log(e.target)
        console.log("yellow")
        dispatch(closeUserModal())
      }
      else{
        dispatch(openUserModal())
      }
    })
  }
  return (
    <div className='w-screen z-30' onClick={()=>{
      toggleModal()
    }}>
        <Header/>
        <body className='relative w-screen h-auto justify-center item-center'>
          <UserModal />        
          {children}
        </body>
    </div>
  )
}

export default Layout