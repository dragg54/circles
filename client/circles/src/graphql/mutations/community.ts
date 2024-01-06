import { gql } from "@apollo/client";

export const JOIN_COMMUNITIES = gql`
    mutation JoinCommunity($communities: [ID]){
        joinCommunities(communityId:$communities){
            msg
        }
    }
`

export const LEAVE_COMMUNITY = gql`
    mutation LeaveCommunity($communityId: ID){
        leaveCommunity(communityId: $communityId){
            msg
        }
    }
`