import mongoose from "mongoose";


const CommunitySchema = new mongoose.Schema({
    communityName: {
        type: String,
        required: true
    },
    communityMembers:
       [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        }
       ]    ,
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
