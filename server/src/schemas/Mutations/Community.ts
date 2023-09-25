import { GraphQLID, GraphQLString } from "graphql"
import { Community } from "../../models/Community"
import { CommunityType } from "../Typedefs/Community"
import { NotFoundError } from "../../types/Error"
import { IUser } from "../../types/User"
import { IContext } from "../../types/Context"

export const CreateCommunity = {
    type: CommunityType,
    args: {
        parentCommunityId: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString }
    },
    resolve(parent: string, args: { title: string, body: string, parentCommunityId: string, author: string }, context: any) {
        const community = new Community({
            parentCommunityUniqueReferenceNumber: args.parentCommunityId,
            title: args.title,
            body: args.body,
            createdAt: Date.now(),
            createdBy: null
        })
    }
}

export const UpdateCommunity = {
    type: CommunityType,
    args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString }
    },
    async resolve(parent: any, args: { id: string, title: string, body: string }, context: any) {
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
    async resolve(parent: any, args: { id: string }, context: IContext) {
        try {
            const community = await Community.findOne({_id: args.id})
            if(community && community.createdBy  == context.user.id){
                const errMsg = "user unauthorized to make this request"
                throw new Error(errMsg)
            }
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
        userId: { type: GraphQLID },
        communityId: { type: GraphQLID }
    },
    async resolve(parent: any, args: any) {
        try {
            const community = await Community.findOne({ id: args.communityId })
            if (community) {
                community.communityMembers[community.communityMembers.length] = args.userId
                return community.save()
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
        userid: { type: GraphQLString },
        communityId: { type: GraphQLString }
    },
    async resolve(parent: any, args: any, context: IContext) {
        try {
            const community = await Community.findOne({ id: args.communityId })
            if (community) {
                if(context.user._id !== community.createdBy){
                    const errMsg = "request unauthorized"
                    throw new Error(errMsg)
                }
                const userIdx: number = community?.communityMembers.findIndex((usr: any) => usr._id == args.userId)!
                community.communityMembers.splice(userIdx, 1)
                Community.findOneAndReplace({ communityMembers: community.communityMembers })
                return "User removed"
            }
        }
        catch (err) {
            console.log(err)
            return err
        }
    }
}

