import { Response, Request } from "express"
import { JwtPayload } from "jsonwebtoken"

export interface IUser{
    id?:string,
    _id?: string,
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