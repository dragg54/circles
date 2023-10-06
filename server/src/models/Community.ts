import mongoose from "mongoose";
import { User, UserSchema } from "./User";

const CommunityMemberSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.ObjectId},
    userName: {type: String}
})

const CommunitySchema = new mongoose.Schema({
    communityName: {
        type: String,
        required: true
    },
    communityMembers:{
        type: [CommunityMemberSchema],
        default: []
    },
    communityDescription:{
        type: String
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

export const Community = mongoose.model("community", CommunitySchema)
