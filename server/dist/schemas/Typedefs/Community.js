"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityInputType = exports.CommunityType = exports.CommunityMember = void 0;
const graphql_1 = require("graphql");
exports.CommunityMember = new graphql_1.GraphQLObjectType({
    name: "CommunityMember",
    fields: {
        _id: { type: graphql_1.GraphQLID }
    }
});
exports.CommunityType = new graphql_1.GraphQLObjectType({
    name: "CommunityType",
    fields: {
        _id: {
            type: graphql_1.GraphQLID
        },
        communityName: {
            type: graphql_1.GraphQLString
        },
        communityDescription: {
            type: graphql_1.GraphQLString
        },
        communityMembers: {
            type: new graphql_1.GraphQLList(exports.CommunityMember)
        }
    }
});
exports.CommunityInputType = new graphql_1.GraphQLInputObjectType({
    name: "CommunityInput",
    fields: {
        _id: { type: graphql_1.GraphQLID }
    }
});
