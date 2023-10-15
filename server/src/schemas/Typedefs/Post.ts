import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

const PostCommunity = new GraphQLObjectType({
    name:"PostCommunity",
    fields:{
        _id: {type: GraphQLString},
        communityName: {type: GraphQLString}
    }
})

const PostUser = new GraphQLObjectType({
    name:"PostUser",
    fields:{
        _id: {type: GraphQLString},
        userName: {type: GraphQLString},
        profilePicture: {type: GraphQLString}
    }
})


export const PostType = new GraphQLObjectType({
    name: "Post",
    fields:{
        // author: {type: GraphQLID},
        _id: {type: GraphQLID},
        parentPostId: {type: GraphQLID},
        community: {type: GraphQLID},
        user: {type: GraphQLID},
        topic: {type: GraphQLString},
        body: {type: GraphQLString},
        createdBy: {type: GraphQLString},
        createdAt: {type: GraphQLString},
    }
})

export const PostResponse = new GraphQLObjectType({
    name: "PostResponse",
    fields:{
        _id: {type: GraphQLID},
        parentPostId: {type: GraphQLID},
        community: {type: PostCommunity},
        user: {type: PostUser},
        topic: {type: GraphQLString},
        body: {type: GraphQLString},
        createdBy: {type: GraphQLString},
        createdAt: {type: GraphQLString},
    }
})



