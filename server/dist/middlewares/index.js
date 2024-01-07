"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleWare = void 0;
const auth_1 = require("./auth");
exports.middleWare = {
    Mutation: {
        createPost: auth_1.IsAuthenticated,
        deletePost: auth_1.IsAuthenticated,
        createCommunity: auth_1.IsAuthenticated,
        deleteCommunity: auth_1.IsAuthorizedAuthor,
        joinCommunities: auth_1.IsAuthenticated,
        deleteCommunityMember: auth_1.IsAuthorizedAuthor,
        follow: auth_1.IsAuthenticated,
        unfollow: auth_1.IsAuthenticated,
        likePost: auth_1.IsAuthenticated,
        leaveCommunity: auth_1.IsAuthenticated,
        unlikePost: auth_1.IsAuthenticated
    },
    RootQuery: {
        userCommunities: auth_1.IsAuthenticated,
    }
};
