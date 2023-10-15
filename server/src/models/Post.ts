import mongoose from "mongoose"
import { User, UserSchema } from "./User"
import { truncate } from "fs/promises"

const PostCommunity = {
    id: {
        type: mongoose.Schema.ObjectId,
    },
    name:{
        type: String
    }
}

const PostSchema = new mongoose.Schema({
    parentPostId:{
        default: null,
        ref: "post",
        type: mongoose.Schema.ObjectId,
    },
    topic:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true
    },
    community:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "community"
    },
    user:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    
    likedBy:{
       type: [UserSchema]
    },
    dislikedBy:{
        type: [UserSchema]
    },
    createdBy:{
        type: mongoose.Schema.ObjectId,
        ref: "User"
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