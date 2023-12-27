import React from 'react'
import UserDetails from '../components/User/UserDetails'
import UserPosts from '../components/User/UserPosts'

const User = () => {
  return (
     <div className='w-full m-auto mt-28'>
        <UserDetails />
        <UserPosts width={"full"}/>
    </div>
  )
}

export default User