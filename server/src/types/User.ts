import { Response, Request } from "express"
import { JwtPayload } from "jsonwebtoken"
import mongoose from "mongoose"

export interface IUser{
    id?:string,
    _id?: typeof mongoose.Schema.ObjectId,
    userName: string,
    profilePicture?: Buffer,
    email: string,
    password?: string,
    bio: string
}

export interface UserLoginResponse extends Response{
   auth: string,
   user: IUser
}

export interface UserLoginPayload extends JwtPayload, IUser{  
}

export interface UserLoginRequest extends Request{
    user: IUser
}