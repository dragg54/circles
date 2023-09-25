import mongoose from "mongoose"
import { User, UserSchema } from "./User"

const PostSchema = new mongoose.Schema({
    parentPostUniqueReferenceNumber:{
        default: null,
        type: mongoose.Schema.ObjectId
    },
    topic:{
        type: String
    },
    body:{
        type: String
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