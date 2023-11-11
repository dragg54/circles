import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { PostType } from "../Typedefs/Post";
import { Post } from '../../models/Post'
import { request, response } from "express";
import { UserLoginRequest } from "../../types/User";
import { InternalServerError } from "../../types/Error";
import { Community } from "../../models/Community";
import { ICommunity } from "../../types/ICommunity";
import { readFile } from "../../middlewares/file";
import { ErrorType } from "../Typedefs/Error";
import { Context } from "../../types/Context";
import { SuccessResponse } from "../Typedefs/Response";
const { GraphQLUpload, FileUpload } = require('graphql-upload')

export const CreatePost = {
    type: PostType || ErrorType,
    args: {
        parentPostId: { type: GraphQLID },
        topic: { type: GraphQLString },
        body: { type: GraphQLString },
        image: { type: GraphQLUpload },
        community: { type: GraphQLID },
        user: { type: GraphQLID },
        createdBy: { type: GraphQLID },
        updatedBy: { type: GraphQLID },
    },
    async resolve(parent: string, args: { topic: string, body: string, image: any, parentPostId: string, user: string, author: string, community: string, createdBy: string, updatedBy: string }, context: any) {
        console.log(args)
        try {
            let imageUrl = ''
            if (args.image) {
                imageUrl = await readFile(args.image)
            }
            const post = new Post({
                parentPostId: args.parentPostId,
                topic: args.topic,
                body: args.body,
                image: imageUrl,
                community: args.community,
                user: context().req.user.id,
                createdAt: Date.now(),
                updatedAt: null,
                createdBy: args.createdBy,
                updatedBy: args.updatedBy
            })
            console.log(context().req.user.id)
            post.save()
            return post
        }
        catch (err) {
            console.log(context().req.user.id)
            return ({ msg: (err as Error).message })
        }
    }
}

export const UpdatePost = {
    type: PostType,
    args: {
        id: { type: GraphQLID },
        topic: { type: GraphQLString },
        body: { type: GraphQLString }
    },
    async resolve(parent: any, args: { id: string, topic: string, body: string }, context: any) {
        try {
            await Post.updateOne({
                _id: args.id
            })
            return "Post updated"
        }
        catch (err) {
            throw new Error(err as string)
        }
    }
}


export const DeletePost = {
    type: PostType,
    args: {
        id: { type: GraphQLID },
    },
    async resolve(parent: any, args: { id: string }, context: any) {
        try {
            await Post.deleteOne({
                _id: args.id
            })
            return "Post deleted"
        }
        catch (err) {
            console.log(err)
            throw new Error(err as string)
        }
    }
}

export const LikePost = {
    type: SuccessResponse,
    args: {
        postId: { type: GraphQLID }
    },
    async resolve(parent: any, args: { postId: string }, context: any) {
        try {
            const existingPost = await Post.findByIdAndUpdate(args.postId, {
                $push: {
                    likedBy: (context().req as UserLoginRequest).user.id
                }
            },
                { new: true })

        }
        catch (err) {
            console.log(err)
            throw new InternalServerError(err as string)
        }
    }
}

export const UnlikePost = {
    type: SuccessResponse,
    args: {
        postId: { type: GraphQLID }
    },
    async resolve(parent: any, args: { postId: string }, context: Context) {
        try {
            const existingPost = await Post.findByIdAndUpdate(args.postId, {
                $pull: {
                    likedBy: (context().req as UserLoginRequest).user.id
                }
            },
                { new: true })

        }
        catch (err) {
            console.log(err)
            throw new InternalServerError(err as string)
        }
    }
}


