import mongoose from "mongoose";
import { User } from "./User";

const CommunitySchema = new mongoose.Schema({
    communityName: {
        type: String
    },
    communityMembers:{
        type: [User]
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