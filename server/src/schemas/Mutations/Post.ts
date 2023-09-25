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
        title:{type: GraphQLString},
        body: {type: GraphQLString}
    },
    resolve(parent: string, args: {title: string, body: string, parentPostId: string, author: string}, context: any){
       const post = new Post({
            parentPostUniqueReferenceNumber: args.parentPostId,
            title: args.title,
            body: args.body,
            createdAt: Date.now(),
            createdBy:null
        })
    }
}

export const UpdatePost = {
    type: PostType,
    args:{
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        body: {type: GraphQLString}
    },
    async resolve(parent: any, args: {id: string, title:string, body: string}, context: any){
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

