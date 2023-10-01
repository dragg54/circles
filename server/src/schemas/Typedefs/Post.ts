import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const PostType = new GraphQLObjectType({
    name: "Post",
    fields:{
        author: {type: GraphQLID},
        parentPostId: {type: GraphQLID},
        communityId: {type: GraphQLID},
        topic: {type: GraphQLString},
        body: {type: GraphQLString}
    }
})