import { IsAuthenticated, IsAuthorizedAuthor } from "./auth";
import { AddLoginDTL } from "./addLoginDtl";

export const middleWare = {
    Mutation: {
        createPost: IsAuthenticated,
        deletePost: IsAuthenticated,
        createCommunity: IsAuthenticated,
        deleteCommunity: IsAuthorizedAuthor,
        joinCommunities: IsAuthenticated,
        deleteCommunityMember: IsAuthorizedAuthor,
        follow: IsAuthenticated,
        unfollow: IsAuthenticated,
        likePost: IsAuthenticated,
        leaveCommunity: IsAuthenticated,
        unlikePost: IsAuthenticated
    },
    RootQuery:{
        userCommunities: IsAuthenticated,
    }
}

