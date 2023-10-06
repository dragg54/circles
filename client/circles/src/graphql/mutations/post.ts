import { gql } from "@apollo/client";

export const CreatePostMutation = gql`
    mutation CreatePost(
        $communityName: String,
        $topic: String,
        $body: String,
    ){
        createPost(topic:$topic, body: $body, communityName:$communityName){
            topic
        }
    }
`