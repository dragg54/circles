import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { PostResponse, PostType } from "../Typedefs/Post";
import { Post } from "../../models/Post";
import { Context } from "../../types/Context";
import { IPost } from "../../types/IPost";

export const GetPosts = {
    type: new GraphQLList(PostResponse),
    async resolve(parent:any, args: any, context: Context) {
        try {
            let posts: IPost[];
            var allPosts: unknown | IPost[] = await Post.find()
            .populate("user", "userName profilePicture")
            .populate("community", "communityName")
            // .limit(20)
            .lean();
            return posts = allPosts as IPost[];
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