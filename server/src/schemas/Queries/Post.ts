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
            .populate("user", "userName profilePic")
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

export const GetCommunityPosts = {
    type: new GraphQLList(PostType),
    args:{
        community: {type: new GraphQLList(GraphQLID)}
    },
    async resolve(parent:any, args: any){
        try{
            const posts = await Post.find({
                community:{
                    $in: args.community
                }
            })
            .populate("user", "userName profilePic")
            .populate("community", "communityName")
            return posts
        }
        catch(err){
            console.log(err)
            return err
        }
    }
}

export const GetPostsByUserId = {
    type: new GraphQLList(PostType),
    args: {
        userId: { type: GraphQLID }
    },
    async resolve(parent: any, args: any){
        try {
            const posts = await Post.find({ createdBy: args.userId })
            .populate("user", "userName profilePic")
            .populate("community", "communityName")
            return posts
        }
        catch (err) {
            throw new Error(err as string)
        }
    }
}

export const GetPostsById = {
    type: PostType,
    args: {id: {type: GraphQLID}},
    async resolve(parent: any, args: any) {
        try {
            const post = await Post.findOne({ _id: args.id })
            .populate("user", "userName profilePic")
            .populate("community", "communityName")
            .lean()
            console.log("post", post)
            return post
        }
        catch (err) {
            throw new Error(err as string)
        }
    }
}