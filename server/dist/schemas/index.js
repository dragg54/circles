"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const User_1 = require("./Mutations/User");
const Post_1 = require("./Queries/Post");
const Post_2 = require("./Mutations/Post");
const Community_1 = require("./Mutations/Community");
const Community_2 = require("./Queries/Community");
const User_2 = require("./Queries/User");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        post: Post_1.GetPostsById,
        posts: Post_1.GetPosts,
        postsByUser: Post_1.GetPostsByUserId,
        communities: Community_2.GetCommunities,
        userCommunities: Community_2.GetCommunitiesByUserId,
        allCommunityPosts: Post_1.GetCommunityPosts,
        community: Community_2.GetCommunitiesById,
        user: User_2.GetUserById,
        comments: Post_1.GetPostComment
    }
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        createPost: Post_2.CreatePost,
        createUser: User_1.CreateUser,
        deletePost: Post_2.DeletePost,
        loginUser: User_1.LoginUser,
        updatePost: Post_2.UpdatePost,
        createCommunity: Community_1.CreateCommunity,
        updateCommunity: Community_1.UpdateCommunity,
        deleteCommunity: Community_1.DeleteCommunity,
        addCommunityMember: Community_1.AddCommunityMembers,
        deleteCommunityMember: Community_1.RemoveCommunityMember,
        joinCommunities: Community_1.JoinCommunities,
        follow: User_1.Follow,
        unfollow: User_1.Unfollow,
        likePost: Post_2.LikePost,
        leaveCommunity: Community_1.LeaveCommunity,
        unlikePost: Post_2.UnlikePost
    }
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
