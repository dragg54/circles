import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_POST, GET_POST_COMMENTS } from '../graphql/queries/post'
import LoadingSpinner from '../components/Loaders/LoadingSpinner'
import PostComp from '../components/Post/PostComp'
import Layout from '../components/Layout'

const Post = () => {

  const {id} = useParams()
  const { data:post, error: postError, loading: postLoading } = useQuery(GET_POST, {
    variables:{
      id
    }
  })
  const { data: comment, error: commentError, loading: commentLoading} = useQuery(GET_POST_COMMENTS, {
    variables:{
      parentPostId: id
    }
  })

  if(postLoading || commentLoading){
    return< LoadingSpinner loading={postLoading}/>
  }

  if(commentError || postError){
    return <>Something happened</>
  }

const _post = {...post.post, comments: comment.comments}

  return (
    <Layout>
      <div className='mt-36 w-full'>
      <PostComp width={'full'} posts={[_post]} loading={postLoading}/>
      </div>
    </Layout>
  )
}

export default Post