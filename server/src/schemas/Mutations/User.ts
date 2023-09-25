import { GraphQLScalarType, GraphQLString } from "graphql";
import { UserLoginResponse, UserType } from "../Typedefs/User";
import bcrypt from 'bcrypt'
import { IUser } from "../../types/User";
import { User } from "../../models/User";
import { DuplicateError, NotFoundError } from "../../types/Error";
import { Request, Response } from "express";
import { sign } from "crypto";
import jwt from 'jsonwebtoken'
import { readFile } from "../../middlewares/file";
import { ImageType } from "../Typedefs/Image";
import { createReadStream } from "fs";

const { GraphQLUpload, FileUpload } =  require('graphql-upload')
export const CreateUser = {
    type: UserType,
    args: {
        userName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        profilePicture: {type: GraphQLUpload}
    },
    async resolve(parent: any, args: IUser, context:any) {
        const existingUser: null | IUser = await User.findOne({ $or: [{ email: args.email}, { userName: args.userName }] })
        if (existingUser) {
            throw new DuplicateError("User already exists")
        }
        bcrypt
            .genSalt(10)
            .then(salt => {
                return bcrypt.hash(args.password!, salt)
            })
            .then(async hash => {
                const { userName, email, password, bio } = args
                const imageUrl = await readFile(args.profilePicture!)
                console.log("image", imageUrl)
                const user = new User({
                    userName,
                    email,
                    profilePic: imageUrl,
                    password: hash,
                    bio,
                    createdAt: Date.now(),
                    createdBy: context.userId
                })
            // return user.save()
            })
            .catch(err => console.error("err", err.message))
    }
}


export const LoginUser = {
    type: UserLoginResponse,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent: any, args: IUser, {req, res}: {req: Request, res: Response} ) {
        try {
            const existingUser: null | IUser = await User.findOne({
                email: args.email
            })
            if (!existingUser) {
                throw new NotFoundError("User not found")
            }
            const isMatch = bcrypt.compare(args.password!, existingUser.password!)
            if (!isMatch) {
                throw new Error("Password is incorrect")
            }
            return {token: jwt.sign({id: existingUser._id,email:existingUser.email, userName: existingUser.userName, bio: existingUser.bio}, process.env.SECRET_KEY!)}
        }
        catch (err) {
            console.log(err)
        }
    }
}


