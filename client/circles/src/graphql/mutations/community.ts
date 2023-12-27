import { gql } from "@apollo/client";

export const JOIN_COMMUNITIES = gql`
    mutation JoinCommunity($userId: ID, $communities: [ID]){
        _id
        communityName
    }
`