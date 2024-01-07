"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginResponse = exports.UserType = void 0;
const graphql_1 = require("graphql");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: {
        _id: { type: graphql_1.GraphQLID },
        userName: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        communities: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        bio: { type: graphql_1.GraphQLString },
        profilePic: { type: graphql_1.GraphQLString },
        following: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        followers: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) }
    }
});
exports.UserLoginResponse = new graphql_1.GraphQLObjectType({
    name: "UserLoginResponse",
    fields: {
        token: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString }
    }
});
