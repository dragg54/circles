import { gql } from "@apollo/client";

export const GETUSER = gql`
    query GetUser($userId: ID){
        user(userId: $userId){
            _id
            userName
            email
            profilePic
            bio
            followers
            following
        }
    }
`