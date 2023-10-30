import { GraphQLID, GraphQLList, GraphQLString } from "graphql"
import { CommunityType } from "../Typedefs/Community"
import { Community } from "../../models/Community"
import { Context } from "../../types/Context"
import { UserLoginRequest } from "../../types/User"

export const GetCommunities = {
    type: new GraphQLList(CommunityType),
    async resolve() {
        try {
            const communities = await Community.find()
            return communities
        }
        catch (err) {
            throw new Error(err as string)
        }
    }
}

export const GetCommunitiesByUserId = {
    type: new GraphQLList(CommunityType),
    args:{userId: {type: GraphQLID}},
    async resolve(parent: any, args: any, context: Context){
        try {
            const communities = await Community.find({
                communityMembers:{
                    $in:[args.userId]
                }
            })
            return communities
        }
        catch (err) {
            throw new Error(err as string)
        }
    }
}

export const GetCommunitiesById = {
    type: CommunityType,
    args: {id: {type: GraphQLID}},
    async resolve(parent: any, args: any) {
        try {
            const community = await Community.find({ _id: args.id })
            return community
        }
        catch (err) {
            throw new Error(err as string)
        }
    }
}