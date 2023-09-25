import { renderGraphiQL } from "express-graphql/renderGraphiQL";
import { GraphQLObjectType, GraphQLString } from "graphql";
import { IUser } from "../../types/User";
import GraphQLUpload from 'graphql-upload'

export const UserType = new GraphQLObjectType({
    name: "User",
    fields:{
        userName: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        bio: {type: GraphQLString},
    }
})

export const UserLoginResponse = new GraphQLObjectType({
    name: "UserLoginResponse",
    fields: {
        token: {type: GraphQLString}
    }
})
