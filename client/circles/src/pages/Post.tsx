import React from 'react'
import { ChildPost, ParentPost } from '../components/Post'
import Layout from '../components/Layout'

const Post = () => {
  return (
    <Layout>
      <div className='flex w-full items-center  flex-col '>
        <div className='flex w-1/2 items-center mt-28  flex-col -gap-3'>
          <ParentPost topic="How To Become A Leader" content="The purpose of becoming a leader should be to guide his or her followers to make a progress on something. According to Albert Einstein, knowing
            the purpose of leadership should be the goal of a true leader. It is so quite unfortunate that many people have defined this as something
            else e.g some people think it is the ownership of the might and will to force poeple to do what they are not supposed to"/>
          <ChildPost topic="How To Become A Leader" content="The purpose of becoming a leader should be to guide his or her followers to make a progress on something. According to Albert Einstein, knowing
            the purpose of leadership should be the goal of a true leader."/>
        </div>
      </div>
    </Layout>
  )
}

export default Post