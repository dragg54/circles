import { gql } from "@apollo/client";

export const CreatePostMutation = gql`
    mutation CreatePost(
        $community: ID,
        $topic: String,
        $body: String,
        $image: Upload
    ){
        createPost(topic:$topic, body: $body, community:$community, image: $image){
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