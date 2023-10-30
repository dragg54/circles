import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
    query GetAllCommunityPosts($community: [ID]){
        allCommunityPosts(community: $community){
            _id
            topic
            body
            image
            likedBy
            community{
                communityName
            }
            user{
                userName
                profilePic
            }
            createdAt
            createdBy
        }
    }
`

export const GET_ALL_POSTS_BY_USER = gql`
    query GetAllUserPosts($userId: ID){
        postsByUser(userId: $userId){
            _id
            topic
            body
            image
            likedBy
            community{
                communityName
            }
            user{
                userName
                profilePic
            }
            createdAt
            createdBy
        }
    }
`