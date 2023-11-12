import React, { Suspense, lazy } from 'react'
import Layout from '../components/Layout'

const Home = () => {
  const Post = lazy(()=> import('../components/Post/PostComp'))
  return (
   <Layout>
     <main className='w-screen h-auto flex flex-col justify-start items-center mt-32'>
      <div className='w-full flex flex-col justify-start items-center'>
       <Suspense fallback={< FallBackLoader />}>
       <Post width={"full"}/>
       </Suspense>
      </div>
    </main>
   </Layout>
  )
}

const FallBackLoader = () =>{
  return(
    <>Loading</>
  )
}

export default Home