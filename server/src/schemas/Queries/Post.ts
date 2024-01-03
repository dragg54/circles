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
            .populate("community", "_id communityName")
            // .limit(20)
            .lean();
            const _posts:IPost[] = [];
            (allPosts as IPost[]).forEach((post: IPost)=>{
                if(!post.parentPostId){
                    const _post = {...post, comments:  (allPosts as IPost[]).filter((pst)=> pst.parentPostId == post._id.toString())}
                    _posts.push(_post)
                }
            })
            return _posts
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
            const allPosts:unknown = await Post.find({
                community:{
                    $in: args.community
                }
            })
            .populate("user", "userName profilePic")
            .populate("community", "communityName")
            .lean()
            const _posts:IPost[] =[];
            (allPosts as IPost[]).forEach((post: IPost)=>{
                if(!post.parentPostId){
                    const _post = {...post, comments:  (allPosts as IPost[]).filter((pst)=> pst.parentPostId == post._id.toString())}
                    _posts.push(_post)
                } 
            })
            return _posts
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
    type: PostResponse,
    args: {id: {type: GraphQLID}},
    async resolve(parent: any, args: any) {
        try {
            const post:unknown = await Post.findOne({ _id: args.id })
            .populate("user", "userName profilePic")
            .populate("community", "_id communityName")
            .lean()
            const posts: unknown = await Post.find()
            .populate("user", "userName profilePic")
            .populate("community", "_id communityName")
            .lean()
            console.log(posts)
            const _post: IPost = {...(post as IPost), comments: (posts as IPost[]).filter((pst)=> pst.parentPostId == (post as IPost)._id.toString())}
            return _post
        }
        catch (err) {
            throw new Error(err as string)
        }
    }
}

export const GetPostComment = {
    type: new GraphQLList(PostType),
    args: {parentPostId: {type: GraphQLID}},
    async resolve(_:any, args:any){
        try{
            const { parentPostId } = args
            const posts = await Post.find({
                parentPostId 
            })
            .populate("user", "userName profilePic")
            return posts
        }
        catch(err){
            console.log(err)
        }
    }
}