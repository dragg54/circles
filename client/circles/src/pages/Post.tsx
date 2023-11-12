import React, { useState } from 'react'
import Layout from '../components/Layout'
import { ParentPost } from '../components/Post/ParentPost'
import { ChildPost } from '../components/Post/ChildPost'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_POST } from '../graphql/queries/post'
import LoadingSpinner from '../components/Loaders/LoadingSpinner'
import { useDispatch } from 'react-redux'
import { fetchPosts } from '../redux/Post'
import PostComp from '../components/Post/PostComp'
import { PostState } from '../types/States'
import postcss from 'postcss'

const Post = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const { data:post, error: postError, loading: postLoading } = useQuery(GET_POST, {
    variables:{
      id
    }
  })
  if(postLoading){
    return< LoadingSpinner loading={postLoading}/>
  }
  console.log(post)
  dispatch(fetchPosts({posts: (post?.post as PostState[])}))

  return (
    <Layout>
     <PostComp width={'full'}/>
    </Layout>
  )
}

export default Post