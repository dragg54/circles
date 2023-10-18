import React, { useEffect } from 'react'
import ProfilePicture from './ProfilePicture'
import { LiaCommentAlt } from 'react-icons/lia'
import { SlLike } from 'react-icons/sl'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ALL_POSTS } from '../graphql/queries/post'
import { IPost } from '../types/IPost'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../redux/Post'
import { PostState } from '../types/States'
import { UserAuth } from '../types/User'
import {  CommunityType } from '../types/Community'

type PostType = {
        post: IPost[]
}
type UserState = {
        auth: UserAuth
}
const Post = ({width}: {width:number | string}) => {
    const user = useSelector(state => (state as UserState).auth).user
    const navigate = useNavigate()
    function goToPost() {
        navigate("/post")
    }
    const { data, error, loading } = useQuery(GET_ALL_POSTS, {
        variables: {
            community: user.communities?.map((comm)=> (comm as CommunityType)._id) 
        }
    })
    const dispatch = useDispatch()
    const posts = useSelector(state => (state as PostType).post)
    useEffect(()=>{
        dispatch(fetchPosts({posts: (data?.allCommunityPosts as PostState[]), community:null}))
    }, [data, loading, error, user])
    if (loading){
        return <p>Loading</p>
    }
    return (
        <>
        {!loading && posts &&  posts.map((post: IPost) => {
            return (
                <div key={post._id} onClick={goToPost} className={`cursor-pointer w-${width} bg-white rounded-md shadow-md p-4 h-auto mb-5 border-l-4 border-r border-t border-[#333A44] border-b-4 shadow-gray-400 `}>
                    <PostHeader />
                    <PostTopic topic={post.topic} />
                    <PostContent content={post.body} image={(post.image as string)} />
                    <PostReactions />
                </div>
            )
        })}
        </>
        )
}


const PostHeader = () => {
    return (
        <div className='w-full flex justify-between items-center border-b border-gray-200 shadow-sm mb-4 pb-4'>
            <div className='items-center flex justify-between'>
                <ProfilePicture height={12} width={12}/>
                <p className='ml-4'>Albert</p>
            </div>
            <div className='text-gray-400'>
                June 5, 2023
            </div>
        </div>
    )
}

const PostTopic = ({ topic }: { topic: string }) => {
    return (
        <h1 className='text-lg font-bold'>{topic}</h1>
    )
}

const PostContent = ({ content, image }: { content: string, image: string }) => {
 return (
       <div className='w-full mt-6'>
            {image?<div className='max-h-[400px] w-full object-cover overflow-hidden mb-5'>
            <img src={'http://'+image} alt="" className='h-full w-full'/>
            </div>: ""}
         <p className='text-gray-500 w-full border-b border-gray-200 shadow-sm pb-4'>{content}
        </p>
       </div>
    )
}

const PostReactions = () => {
    return (
        <div className='flex justify-start mt-3 items-center gap-3'>
            <div>
                <p className='flex items-center gap-3'><SlLike className="w-5 h-5" />500 Likes</p>
            </div>
            <div>
                <div>
                    <p className='flex items-center gap-3'><LiaCommentAlt className="w-6 h-6" /> 200 Comments</p>
                </div>
            </div>
        </div>
    )
}

export const ParentPost = ({ topic, content }: { topic: string, content: string }) => {
    return (
        <div className='cursor-pointer w-full bg-white rounded-md shadow-md p-4 h-auto mb-5 border-l-4 border-r border-t border-[#333A44] border-b-4 shadow-gray-400 '>
            <PostHeader />
            <PostTopic topic={topic} />
            <PostContent content={content} image='' />
            <PostReactions />
        </div>
    )
}


export const ChildPost = ({ topic, content }: { topic: string, content: string }) => {
    return (
        <div className='cursor-pointer w-11/12 self-end bg-white rounded-md shadow-md p-4 h-auto mb-5 border-l-4 border-r border-t border-[#333A44] border-b-4 shadow-gray-400 '>
            <PostHeader />
            <PostContent content={content} image=''/>
            <PostReactions />
        </div>
    )
}

export default Post