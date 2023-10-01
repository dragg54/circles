import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { PostType } from "../Typedefs/Post";
import { Post } from '../../models/Post'
import { request, response } from "express";
import { UserLoginRequest } from "../../types/User";
import { InternalServerError } from "../../types/Error";

export const CreatePost = {
    type: PostType,
    args:{
        parentPostId: {type: GraphQLID},
        topic:{type: GraphQLString},
        body: {type: GraphQLString},
        communityId: {type: GraphQLID},
        createdBy: {type: GraphQLID},
        updatedBy : {type: GraphQLID},
    },
    resolve(parent: string, args: {topic: string, body: string, parentPostId: string, author: string, communityId: string, createdBy: string, updatedBy: string}, context: any){
       try{
        const post = new Post({
            parentPostUniqueReferenceNumber: args.parentPostId,
            topic: args.topic,
            body: args.body,
            communityId: args.communityId,
            createdAt: Date.now(),
            updaedAt: null,
            createdBy: args.createdBy,
            updatedBy: args.updatedBy
        })
        return post.save()
       }
       catch(err){
        console.log(err)
        return new InternalServerError(err as string)
       }
    }
}

export const UpdatePost = {
    type: PostType,
    args:{
        id: {type: GraphQLID},
        topic: {type: GraphQLString},
        body: {type: GraphQLString}
    },
    async resolve(parent: any, args: {id: string, topic:string, body: string}, context: any){
        try{
            await Post.updateOne({
                _id: args.id
            })
            return "Post updated"
        }
        catch(err){
            throw new Error(err as string)
        }
    }
}


export const DeletePost = {
    type: PostType,
    args:{
        id: {type: GraphQLID},
    },
    async resolve(parent: any, args: {id: string}, context: any){
        try{
            await Post.deleteOne({
                _id: args.id
            })
            return "Post deleted"
        }
        catch(err){
            throw new Error(err as string)
        }
    }
}

export const AddLikes = {
    args:{
        postId: {type: GraphQLID}
    },
    async resolve(parent: any, args: {postId: string}, context: any){
        try{
            const existingPost = await Post.findOne({_id: args.postId})
            if(existingPost){
                const exisitingLikes = existingPost.likedBy.filter(usr => usr._id != context.user.id)
                Post.findOneAndReplace()
            }
        }
        catch(err){
            throw new InternalServerError(err as string)
        }
    }
}


