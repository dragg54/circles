import React from 'react'
import Layout from '../components/Layout'
import { Post } from '../components/Post/Post'

const Home = () => {
  return (
   <Layout>
     <main className='w-screen h-auto flex flex-col justify-start items-center mt-32'>
      <div className='w-1/2 flex flex-col justify-start items-center'>
        <Post width={"full"}/>
      </div>
    </main>
   </Layout>
  )
}

export default Home