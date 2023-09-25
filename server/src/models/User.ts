import mongoose from "mongoose"

export const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    profilePic:{
        type: String
    },
    bio:{
        type: String,
        require: true
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

export const User = mongoose.model("User", UserSchema)