import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const CommunityMember = new GraphQLObjectType({
    name: "CommunityMember",
    fields:{
        _id:{type:GraphQLID}
    }
})

export const CommunityType = new GraphQLObjectType({
    name: "CommunityType",
    fields:{
        _id:{
            type: GraphQLID
        },
        communityName:{
            type: GraphQLString
        },
        communityDescription:{
            type: GraphQLString
        },
        communityMembers:{
            type: new GraphQLList(CommunityMember)
        }
    }
})