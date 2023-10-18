import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
    query GetAllCommunityPosts($community: [ID]){
        allCommunityPosts(community: $community){
            _id
            topic
            body
            image
            community{
                communityName
                
            }
            createdAt
            createdBy
        }
    }
`