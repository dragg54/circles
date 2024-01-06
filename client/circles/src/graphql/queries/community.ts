import { gql } from "@apollo/client";

export const GET_COMMUNITIES = gql`
    query GetCOmmunities{
        communities{
            _id
            communityName
            communityDescription
        }
    }
`

export const GET_USER_COMMUNITIES = gql`
    query GetCommunity($userId: ID){
        userCommunities(userId: $userId) {
        _id
        communityName
        communityDescription
        }
    }
`

export const GET_COMMUNITY = gql`
    query GetCommunity($id: ID){
        community(id: $id) {
        _id
        communityName
        communityDescription
        communityMembers{
            _id
        }
        }
    }
`

export const GET_COMMUNITY_POSTS = gql`
    query GetCommunityPosts($communityId: [ID]){
        allCommunityPosts(community: $communityId){
            _id
            topic
            body
            image
            user{
                _id
                userName
                profilePic
            }
            community{
                _id
                communityName
            }
            likedBy,
            comments{
                _id
                body
            }
        }
    }
`
