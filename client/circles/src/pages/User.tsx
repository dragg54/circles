import React from 'react'
import UserDetails from '../components/User/UserDetails'
import Layout from '../components/Layout'
import UserPosts from '../components/User/UserPosts'

const User = () => {
  return (
   <Layout>
     <div className='w-full m-auto mt-28'>
        <UserDetails />
        <UserPosts width={"full"}/>
    </div>
   </Layout>
  )
}

export default User