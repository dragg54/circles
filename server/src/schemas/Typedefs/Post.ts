import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

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
        profilePic: {type: GraphQLString}
    }
})


export const PostType = new GraphQLObjectType({
    name: "Post",
    fields:{
        // author: {type: GraphQLID},
        _id: {type: GraphQLID},
        parentPostId: {type: GraphQLID},
        comments:{type: new GraphQLList(new GraphQLObjectType({
            name: "Comment",
            fields:{
                _id: {type: GraphQLString},
                body: {type: GraphQLString},
                user: {type: PostUser},
                community: {type: PostCommunity},
            }
        }))},
        image: {type: GraphQLString},
        community: {type: PostCommunity},
        user: {type: PostUser},
        topic: {type: GraphQLString},
        body: {type: GraphQLString},
        likedBy:{type: new GraphQLList(GraphQLID)},
        createdBy: {type: GraphQLString},
        createdAt: {type: GraphQLString},
    }
})



export const PostResponse = new GraphQLObjectType({
    name: "PostResponse",
    fields:{
        _id: {type: GraphQLID},
        parentPostId: {type: GraphQLID},
        image: {type: GraphQLString},
        community: {type: PostCommunity},
        comments: {type: new GraphQLList(PostType)},
        user: {type: PostUser},
        topic: {type: GraphQLString},
        body: {type: GraphQLString},
        likedBy: {type: new GraphQLList(GraphQLString)},
        createdBy: {type: GraphQLString},
        createdAt: {type: GraphQLString},
    }
})





