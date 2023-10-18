import React from 'react'
import UserDetails from '../components/User/UserDetails'
import Layout from '../components/Layout'
import Post from '../components/Post'

const User = () => {
  return (
   <Layout>
     <div className='w-2/3 m-auto mt-28'>
        <UserDetails />
        <Post width={"full"}/>
    </div>
   </Layout>
  )
}

export default User