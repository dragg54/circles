import { Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { IUser, UserLoginPayload, UserLoginRequest, UserLoginResponse } from "../types/User"
import { Auth } from "../types/Auth"
import { decode } from "punycode"
require

export function verify(req: UserLoginRequest, next:any){
const token: string = req.headers.auth as string
   if(!token){
        throw new Error("User not logged in")
    }    
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY!)
        console.log(decoded)
        const user = {
            id: (decoded as UserLoginPayload).id,
            userName: (decoded as UserLoginPayload).userName,
            email: (decoded as UserLoginPayload).email,
            bio: (decoded as UserLoginPayload).bio
        }
        req.user = user
    } 
    catch(err){
        throw new Error(err as string)
    }   
}