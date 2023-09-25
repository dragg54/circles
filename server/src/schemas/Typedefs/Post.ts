import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const PostType = new GraphQLObjectType({
    name: "Post",
    fields:{
        author: {type: GraphQLID},
        parentPost: {type: GraphQLID},
        title: {type: GraphQLString},
        body: {type: GraphQLString}
    }
})