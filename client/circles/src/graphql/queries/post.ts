import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
    query GetAllCommunityPosts($community: [ID]){
        allCommunityPosts(community: $community){
            _id
            parentPostId
            topic
            body
            comments{
                _id
                body
            }
            image
            likedBy
            community{
                _id
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
            comments{
                _id
                body
                user{
                    _id
                    userName
                }
                community{
                    _id
                    communityName
                }
            }
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

export const GET_POST = gql`
    query GetPost($id: ID){
        post(id: $id){
            _id
            topic
            body
            image
            comments{
                _id
                body
                user{
                    _id
                    userName
                }
                community{
                    _id
                    communityName
                }
            }
            likedBy
            community{
                _id,
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

export const GET_POST_COMMENTS = gql`
    query GetComments($parentPostId: ID){
        comments(parentPostId: $parentPostId){
            _id
            topic
            body
            image
            likedBy
            comments{
                _id
                body
                user{
                    _id
                    userName
                }
                community{
                    _id
                    communityName
                }
            }
            community{
                _id,
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