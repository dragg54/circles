"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResponse = exports.PostType = void 0;
const graphql_1 = require("graphql");
const PostCommunity = new graphql_1.GraphQLObjectType({
    name: "PostCommunity",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        communityName: { type: graphql_1.GraphQLString },
        communityDescription: { type: graphql_1.GraphQLString }
    }
});
const PostUser = new graphql_1.GraphQLObjectType({
    name: "PostUser",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        userName: { type: graphql_1.GraphQLString },
        profilePic: { type: graphql_1.GraphQLString }
    }
});
exports.PostType = new graphql_1.GraphQLObjectType({
    name: "Post",
    fields: {
        // author: {type: GraphQLID},
        _id: { type: graphql_1.GraphQLID },
        parentPostId: { type: graphql_1.GraphQLID },
        comments: { type: new graphql_1.GraphQLList(new graphql_1.GraphQLObjectType({
                name: "Comment",
                fields: {
                    _id: { type: graphql_1.GraphQLString },
                    body: { type: graphql_1.GraphQLString },
                    user: { type: PostUser },
                    community: { type: PostCommunity },
                }
            })) },
        image: { type: graphql_1.GraphQLString },
        community: { type: PostCommunity },
        user: { type: PostUser },
        topic: { type: graphql_1.GraphQLString },
        body: { type: graphql_1.GraphQLString },
        likedBy: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
        createdBy: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString },
    }
});
exports.PostResponse = new graphql_1.GraphQLObjectType({
    name: "PostResponse",
    fields: {
        _id: { type: graphql_1.GraphQLID },
        parentPostId: { type: graphql_1.GraphQLID },
        image: { type: graphql_1.GraphQLString },
        community: { type: PostCommunity },
        comments: { type: new graphql_1.GraphQLList(exports.PostType) },
        user: { type: PostUser },
        topic: { type: graphql_1.GraphQLString },
        body: { type: graphql_1.GraphQLString },
        likedBy: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        createdBy: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString },
    }
});
