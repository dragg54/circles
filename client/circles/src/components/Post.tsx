import React from 'react'
import ProfilePicture from './ProfilePicture'
import { LiaCommentAlt } from 'react-icons/lia'
import { SlLike } from 'react-icons/sl'
import { useNavigate } from 'react-router-dom'

const Post = () => {
    const navigate = useNavigate()
    function goToPost(){
        navigate("/post")
    }
    return (
        <div onClick={goToPost} className='cursor-pointer w-1/2 bg-white rounded-md shadow-md p-4 h-auto mb-5 border-l-4 border-r border-t border-[#333A44] border-b-4 shadow-gray-400 '>
            <PostHeader />
            <PostTopic topic="How To Become A Leader"/>
            <PostContent content="The purpose of becoming a leader should be to guide his or her followers to make a progress on something. According to Albert Einstein, knowing
            the purpose of leadership should be the goal of a true leader."/>
            <PostReactions />
        </div>
    )
}

const PostHeader = () => {
    return (
        <div className='w-full flex justify-between items-center border-b border-gray-200 shadow-sm mb-4 pb-4'>
            <div className='items-center flex justify-between'>
                <ProfilePicture />
                <p className='ml-4'>Albert</p>
            </div>
            <div className='text-gray-400'>
                June 5, 2023
            </div>
        </div>
    )
}

const PostTopic = ({topic}: {topic: string}) => {
    return (
        <h1 className='text-lg font-bold'>{topic}</h1>
    )
}

const PostContent = ({content}: {content: string}) => {
    return (
        <p className='text-gray-500 w-full border-b border-gray-200 shadow-sm pb-4'>{content}
        </p>
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

export const ParentPost = ({topic, content}: {topic:string, content: string}) => {
    return (
        <div className='cursor-pointer w-full bg-white rounded-md shadow-md p-4 h-auto mb-5 border-l-4 border-r border-t border-[#333A44] border-b-4 shadow-gray-400 '>
            <PostHeader />
            <PostTopic topic={topic}/>
            <PostContent content={content}/>
            <PostReactions />
        </div>
    )
}


export const ChildPost = ({topic, content}: {topic:string, content: string}) => {
    return (
        <div className='cursor-pointer w-11/12 self-end bg-white rounded-md shadow-md p-4 h-auto mb-5 border-l-4 border-r border-t border-[#333A44] border-b-4 shadow-gray-400 '>
            <PostHeader />
            <PostContent content={content}/>
            <PostReactions />
        </div>
    )
}

export default Post