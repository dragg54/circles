import mongoose from "mongoose"

export interface IPost{
    _id?: typeof mongoose.Schema.ObjectId,
    id?: string,
    parentPostId?: string,
    topic?: string
    body?: string,
    author?:{
        id: typeof mongoose.Schema.ObjectId,
        userName: string
    }
    communityId?:string,
    likedBy?:string
    dislikedBy?:string
    createdBy?:string
    createdAt?:string
    updatedBy?:string
    updatedAt?:string
}