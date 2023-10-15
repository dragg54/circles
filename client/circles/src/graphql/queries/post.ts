import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
    query{
        getPosts{
            _id
            topic
            body
            community{
                communityName
                
            }
            createdAt
            createdBy
        }
    }
`