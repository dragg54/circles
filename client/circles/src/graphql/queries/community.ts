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
    query GetCommunity{
        userCommunities {
        _id
        communityName
        }
    }
`