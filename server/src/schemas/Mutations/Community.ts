import { GraphQLID, GraphQLList, GraphQLString } from "graphql"
import { Community } from "../../models/Community"
import { CommunityType } from "../Typedefs/Community"
import { NotFoundError } from "../../types/Error"
import { IUser } from "../../types/User"
import { Context } from "../../types/Context"
import { GetCommunitiesById } from "../Queries/Community"
import { ICommunity } from "../../types/ICommunity"
import { SuccessResponse } from "../Typedefs/Response"

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
        communityId: {type: new GraphQLList(GraphQLID)},
        userId: {type: GraphQLID}
    },
    async resolve(parent: any, args: any){
       try{
        args.communityId.forEach((community: ICommunity)=>{
            if(community.communityMembers?.includes(args.userId)){
                throw new Error(`User is already a member of community with id ${community}`)
            }            
            const comm =  Community.updateMany(community , {
                $push:{
                    communityMembers: args.userId
                }
            }, {new: true})
            console.log(comm)
        })
        return {msg: "User added to communities"}
    }
       catch(err){
        console.log(err)
        return(err)
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
                console.log(community.communityMembers)
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

