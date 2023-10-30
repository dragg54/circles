import { gql } from "@apollo/client";

export const GET_COMMUNITIES = gql`
    query GetCOmmunities{
        communities{
            _id
            communityName
        }
    }
`

export const GET_USER_COMMUNITIES = gql`
    query GetCommunity($userId: ID){
        userCommunities(userId: $userId) {
        _id
        communityName
        }
    }
`
