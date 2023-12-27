import { gql } from "@apollo/client";

export const CreatePostMutation = gql`
    mutation CreatePost(
        $community: ID,
        $parentPostId: ID,
        $topic: String,
        $body: String,
        $image: Upload
    ){
        createPost(topic:$topic, body: $body, parentPostId: $parentPostId, community:$community, image: $image){
            parentPostId
            topic
            body
            image
            community{
                _id
                communityName
            }
            user{
                _id
                userName
            }
            createdAt
            createdBy
        }
    }
`
export const LikePost = gql`
    mutation LikePost(
        $postId: ID
    ){
        likePost(postId: $postId){
            msg
        }
    }
`

export const UnLikePost = gql`
    mutation UnlikePost(
        $postId: ID
    ){
        unlikePost(postId: $postId){
            msg
        }
    }
`