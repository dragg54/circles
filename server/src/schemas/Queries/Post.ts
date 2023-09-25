import { GraphQLList, GraphQLString } from "graphql";
import { PostType } from "../Typedefs/Post";
import { Post } from "../../models/Post";

export const GetPosts = {
    type: new GraphQLList(PostType),
    async resolve() {
        try {
            const posts = await Post.find()
            return posts
        }
        catch (err) {
            throw new Error(err as string)
        }
    }
}

export const GetPostsByUserId = {
    type: new GraphQLList(PostType),
    args: {
        userId: { type: GraphQLString }
    },
    async resolve(parent: any, args: any){
        try {
            const posts = await Post.find({ createdBy: args.userId })
            return posts
        }
        catch (err) {
            throw new Error(err as string)
        }
    }
}

export const GetPostsById = {
    type: PostType,
    args: {id: {type: GraphQLString}},
    async resolve(parent: any, args: any) {
        try {
            const post = await Post.find({ _id: args.id })
            return post
        }
        catch (err) {
            throw new Error(err as string)
        }
    }
}