import React from 'react'
import { PostHeader } from './Postheader'
import { IPost } from '../../types/IPost'
import { PostContent } from './PostContent'
import { PostReactions } from './PostReaction'

const PostComment = ({comment}:{comment: IPost}) => {
  return (
    <div className='mt-8'>
        <PostHeader post={comment}/>
        <PostContent content={comment.body} image={comment.image.toString()} />
        <PostReactions post={comment}/>
    </div>
  )
}

export default PostComment