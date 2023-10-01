import mongoose from "mongoose"
import { User, UserSchema } from "./User"

const PostSchema = new mongoose.Schema({
    parentPostId:{
        default: null,
        type: mongoose.Schema.ObjectId
    },
    topic:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    communityId:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    likedBy:{
       type: [UserSchema]
    },
    dislikedBy:{
        type: [UserSchema]
    },
    createdBy:{
        type: mongoose.Schema.ObjectId
    },
    createdAt:{
        type: Date
    },
    updatedBy:{
        type: mongoose.Schema.ObjectId
    },
    updatedAt:{
        type: Date
    }
})

export const Post = mongoose.model("Post", PostSchema)