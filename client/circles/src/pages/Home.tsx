import React, { Suspense, lazy, useEffect } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../components/Loaders/LoadingSpinner'
import { useQuery } from '@apollo/client'
import { GET_ALL_POSTS } from '../graphql/queries/post'
import { CommunityType } from '../types/Community'
import { IPost } from '../types/IPost'
import { UserAuth } from '../types/User'
import PostComp from '../components/Post/PostComp'

const Home = () => {
  type PostType = {
    post: IPost[]
}
type UserState = {
    auth: UserAuth
}
const user = useSelector(state => (state as UserState).auth).user
 const { data, error, loading, refetch } = useQuery(GET_ALL_POSTS, {
    variables: {
        community: user?.communities?.map((comm) => (comm as CommunityType)._id)
    }
})
useEffect(()=>{
  refetch()
}, [])
const posts = useSelector(state => (state as PostType).post)
if (loading || !posts) {
    return <LoadingSpinner {...{ loading }} />
}
console.log(data)
  const Post = lazy(()=> import('../components/Post/PostComp'))
  return (
     <Layout>
      <main className='w-screen h-auto flex flex-col justify-start items-center mt-32'>
      <div className='w-full flex flex-col justify-start items-center'>
       {/* <Suspense fallback={< FallBackLoader />}>
       <Post  width={"full"} posts={data.allCommunityPosts} loading={loading}/>
       </Suspense> */}
       <PostComp type='posts' width={'full'} loading={loading} posts={data.allCommunityPosts}/>
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