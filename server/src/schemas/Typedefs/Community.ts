import { GraphQLObjectType, GraphQLString } from "graphql";

export const CommunityType = new GraphQLObjectType({
    name: "CommunityType",
    fields:{
        communityName:{
            type: GraphQLString
        },
        communityDescription:{
            type: GraphQLString
        }
    }
})