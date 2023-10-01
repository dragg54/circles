import { GraphQLID, GraphQLString } from "graphql"
import { Community } from "../../models/Community"
import { CommunityType } from "../Typedefs/Community"
import { NotFoundError } from "../../types/Error"
import { IUser } from "../../types/User"
import { Context } from "../../types/Context"
import { GetCommunitiesById } from "../Queries/Community"

export const CreateCommunity = {
    type: CommunityType,
    args: {
        parentCommunityId: { type: GraphQLID! },
        communityName: { type: GraphQLString! },
        communityDescription: { type: GraphQLString! }
    },
    resolve(parent: string, args: { communityName: string, communityDescription: string, parentCommunityId: string, author: string }, context: any) {
        console.log(args)
       try{
        const community = new Community({
            parentCommunityUniqueReferenceNumber: args.parentCommunityId,
            communityName: args.communityName,
            communityDescription: args.communityDescription,
            createdAt: Date.now(),
            createdBy: null
        })
        return community.save()
       }
       catch(err){
        console.log(err)
        return new Error("Internal Server Error")
       }
    }
}

export const UpdateCommunity = {
    type: CommunityType,
    args: {
        id: { type: GraphQLID },
        communityName: { type: GraphQLString },
        communityDescription: { type: GraphQLString }
    },
    async resolve(parent: any, args: { id: string, communityName: string, communityDescription: string }, context: any) {
        try {
            await Community.updateOne({
                _id: args.id
            })
            return "Community updated"
        }
        catch (err) {
            throw new Error(err as string)
        }
    }
}


export const DeleteCommunity = {
    type: GraphQLString,
    args: {
        id: { type: GraphQLID },
    },
    async resolve(parent: any, args: { id: string }, context: Context) {
        try {
            const community = await Community.findOne({_id: args.id})
            await Community.deleteOne({
                _id: args.id
            })
            return "Community deleted"
        }
        catch (err) {
            throw new Error(err as string)
        }
    }
}

export const AddCommunityMembers = {
    type: CommunityType,
    args: {
        userId: { type: GraphQLID!},
        communityId: { type: GraphQLID! }
    },
    async resolve(parent: any, args: any) {
        try {
            const community = await Community.findOne({ _id: args.communityId })
            const userName = await Community.findOne({_id: args.userId})
            if (community) {
                const communityMembers = community.communityMembers
                const newCommunityMembers = [...communityMembers, args.userId]
                return Community.findOneAndUpdate({_id: args.communityId}, {communityMembers: newCommunityMembers})
            }
            else {
                throw new NotFoundError("Community not found")
            }
        }
        catch (err) {
            console.log(err)
            return err
        }
    }
}

export const RemoveCommunityMember = {
    type: GraphQLString,
    args: {
        userId: { type: GraphQLID },
        communityId: { type: GraphQLID }
    },
    async resolve(parent: any, args: any) {
        try {
            const community = await Community.findOne({_id: args.communityId })
            if (community) {
                const userIdx: number = community?.communityMembers.findIndex((usr: any) => usr == args.userId)!
                community.communityMembers.splice(userIdx, 1)
                console.log(community.communityMembers)
                await Community.findOneAndUpdate({_id: args.communityId}, {communityMembers: community.communityMembers })
                return "User removed"
            }
        }
        catch (err) {
            console.log(err)
            return err
        }
    }
}

