import { GraphQLID, GraphQLList, GraphQLString } from "graphql"
import { Community } from "../../models/Community"
import { CommunityType } from "../Typedefs/Community"
import { NotFoundError } from "../../types/Error"
import { IUser, UserLoginRequest } from "../../types/User"
import { Context } from "../../types/Context"
import { GetCommunitiesById } from "../Queries/Community"
import { ICommunity } from "../../types/ICommunity"
import { SuccessResponse } from "../Typedefs/Response"
import { error } from "console"
import mongoose from "mongoose"

export const CreateCommunity = {
    type: CommunityType,
    args: {
        parentCommunityId: { type: GraphQLID! },
        communityName: { type: GraphQLString! },
        communityDescription: { type: GraphQLString! }
    },
    resolve(parent: string, args: { communityName: string, communityDescription: string, parentCommunityId: string, author: string }, context: any) {
        try {
            const community = new Community({
                parentCommunityUniqueReferenceNumber: args.parentCommunityId,
                communityName: args.communityName,
                communityDescription: args.communityDescription,
                createdAt: Date.now(),
                createdBy: null
            })
            return community.save()
        }
        catch (err) {
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
            const community = await Community.findOne({ _id: args.id })
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
        userId: { type: GraphQLID! },
        communityId: { type: GraphQLID! }
    },
    async resolve(parent: any, args: any) {
        try {
            const community = await Community.findOne({ _id: args.communityId })
            if (community.communityMembers.some((member) => member == args.userId)) {
                throw new Error("User is already a member")
            }
            const communityMembers = community.communityMembers
            const newCommunityMembers = [...communityMembers, args.userId]
            return Community.findOneAndUpdate({ _id: args.communityId }, { communityMembers: newCommunityMembers })

        }
        catch (err) {
            console.log(err)
            return err
        }
    }
}

export const JoinCommunities = {
    type: SuccessResponse,
    args: {
        communityId: { type: new GraphQLList(GraphQLID) },
    },
    async resolve(parent: any, args: any, context: Context) {
        console.log(args)
        try {
            Promise.all(args.communityId.map(async(community: ICommunity) => {
                const comm = await Community.findOne({
                    _id: args.communityId[0]
                })
                if(!comm){
                    throw new Error(`Community with id ${args.communityId[0]} does not exist`)
                }
                if ((comm.communityMembers as unknown[])?.includes((context().req as UserLoginRequest).user.id)) {
                    throw new Error(`User is already a member of community with id ${community}`)
                }
                 await Community.findByIdAndUpdate({_id: community}, {
                    $push: {
                        communityMembers: (context().req as UserLoginRequest).user.id
                    }
                }, { new: true })
            }))
            return { msg: "User added to communities" }
        }
        catch (err) {
            console.log(err)
            return err
        }
    }
}

export const LeaveCommunity = {
    type: SuccessResponse,
    args: {
        communityId: { type: GraphQLID }
    },
    async resolve(parent: any, args: any, context: Context) {
        try {
            const existingCommunity: ICommunity = await Community.findOne({
                _id: args.communityId
            })
            if (!existingCommunity) {
                return new Error("community does not exist")
            }
            console.log("user", (context().req as UserLoginRequest).user)
            if (!existingCommunity.communityMembers.includes((context().req as UserLoginRequest).user.id)) {
                return new Error(`user is not a member of ${existingCommunity.communityName} community`)
            }
           await Community.findByIdAndUpdate(args.communityId, {
                $pull: {
                    communityMembers: (context().req as UserLoginRequest).user.id
                }
            }, {new: true})
            return { msg: "User removed to communities" }
        }
        catch (err) {
            console.log(err)
            return (err)
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
            const community = await Community.findOne({ _id: args.communityId })
            if (community) {
                const userIdx: number = community?.communityMembers.findIndex((usr: any) => usr == args.userId)!
                community.communityMembers.splice(userIdx, 1)
                await Community.findOneAndUpdate({ _id: args.communityId }, { communityMembers: community.communityMembers })
                return "User removed"
            }
        }
        catch (err) {
            console.log(err)
            return err
        }
    }
}

