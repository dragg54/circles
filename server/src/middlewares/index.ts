import { IsAuthenticated, IsAuthorizedAuthor } from "./auth";
import { AddLoginDTL } from "./addLoginDtl";

export const middleWare = {
    Mutation: {
        createPost: IsAuthenticated,
        deletePost: IsAuthenticated,
        createCommunity: IsAuthenticated,
        deleteCommunity: IsAuthorizedAuthor,
        deleteCommunityMember: IsAuthorizedAuthor
    }
}