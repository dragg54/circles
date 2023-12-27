import React from 'react'
import { PostHeader } from '../Post/Postheader'
import { PostTopic } from '../Post/PostTopic'
import { PostContent } from '../Post/PostContent'
import { PostReactions } from '../Post/PostReaction'
import { IPost } from '../../types/IPost'
import { useQuery } from '@apollo/client'
import { GET_ALL_POSTS_BY_USER } from '../../graphql/queries/post'
import { useParams } from 'react-router-dom'

const UserPosts = ({width}: {width: string}) => {
    const {id} = useParams() 
    const { data: posts, error, loading } = useQuery(GET_ALL_POSTS_BY_USER, {
        variables: {
            userId:id
        }
    })
    
    if (loading){
        return <p>Loading</p>
    }
    console.log("posts", posts)
    return (
        <>
        {!loading && posts &&  posts.postsByUser.map((post: IPost) => {
            return (
                <div key={post._id}  className={`cursor-pointer w-${width} bg-white rounded-md shadow-md p-4 h-auto mb-5 border-l-4 border-r border-t border-[#333A44] border-b-4 shadow-gray-400 `}>
                    <PostHeader post={post}/>
                    <PostTopic topic={post.topic} />
                    <PostContent content={post.body} image={(post.image as string)} />
                    <PostReactions  post = {post}/>
                </div>
            )
        })}
        </>
    )
        
}

export default UserPosts