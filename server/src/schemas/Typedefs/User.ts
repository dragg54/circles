import { renderGraphiQL } from "express-graphql/renderGraphiQL";
import { GraphQLObjectType, GraphQLString, graphql } from "graphql";
import { IUser } from "../../types/User";
import GraphQLUpload from 'graphql-upload'

export const UserType = new GraphQLObjectType({
    name: "User",
    fields:{
        userName: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        bio: {type: GraphQLString},
        profilePicture: {type: GraphQLString}
    }
})

export const UserLoginResponse = new GraphQLObjectType({
    name: "UserLoginResponse",
    fields: {
        token: {type: GraphQLString},
        status: {type: GraphQLString}
    }
})
