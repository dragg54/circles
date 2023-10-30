import { renderGraphiQL } from "express-graphql/renderGraphiQL";
import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, graphql } from "graphql";
import { IUser } from "../../types/User";
import GraphQLUpload from 'graphql-upload'

export const UserType = new GraphQLObjectType({
    name: "User",
    fields:{
        _id: {type: GraphQLID},
        userName: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        communities: {type: new GraphQLList(GraphQLString)},
        bio: {type: GraphQLString},
        profilePic: {type: GraphQLString},
        following: {type: new GraphQLList(GraphQLString)},
        followers: {type: new GraphQLList(GraphQLString)}
    }
})

export const UserLoginResponse = new GraphQLObjectType({
    name: "UserLoginResponse",
    fields: {
        token: {type: GraphQLString},
        status: {type: GraphQLString}
    }
})
