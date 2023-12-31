import React from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_COMMUNITY_POSTS } from '../graphql/queries/community'
import LoadingSpinner from '../components/Loaders/LoadingSpinner'
import PostComp from '../components/Post/PostComp'

const Community = () => {
    const { id } = useParams()

    const { data: communityPosts, error: communityPostError, loading: communityPostLoading } = useQuery(GET_COMMUNITY_POSTS, {
        variables: {
            communityId: [id]
        }
    })

    if (communityPostLoading) {
        return < LoadingSpinner loading={communityPostLoading} />
    }

    return (
        <Layout>
            <main className='w-screen h-auto flex flex-col justify-start items-center mt-32'>
            <div className='w-full flex flex-col justify-start items-center'>
                <PostComp posts={communityPosts.allCommunityPosts} loading={communityPostLoading} width={'full'} type='posts' />
            </div>
            </main>
        </Layout>
    )
}

export default Community