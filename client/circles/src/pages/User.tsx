import React from 'react'
import UserDetails from '../components/User/UserDetails'
import UserPosts from '../components/User/UserPosts'
import Layout from '../components/Layout'

const User = () => {
  return (
    <Layout>
     <div className='w-full flex flex-col items-center m-auto mt-28'>
        <UserDetails />
        <UserPosts width={"full"}/>
    </div>
    </Layout>
  )
}

export default User