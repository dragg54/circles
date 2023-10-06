import mongoose from "mongoose";

export interface ICommunity{
    _id:typeof mongoose.Schema.ObjectId,
    id: string,
    communityName: string
}