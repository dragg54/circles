import { GraphQLID, GraphQLScalarType, GraphQLString } from "graphql";
import { UserLoginResponse, UserType } from "../Typedefs/User";
import bcrypt from 'bcrypt'
import { IUser, UserLoginRequest } from "../../types/User";
import { User } from "../../models/User";
import { DuplicateError, InternalServerError, NotFoundError } from "../../types/Error";
import { Request, Response } from "express";
import { sign } from "crypto";
import jwt from 'jsonwebtoken'
import { readFile } from "../../middlewares/file";
import { ImageType } from "../Typedefs/Image";
import { createReadStream } from "fs";
import { Context } from "../../types/Context";
import { getUser } from "../../utils/GetCurrentUser";
import { Community } from "../../models/Community";
import { RequestResponse } from "../Typedefs/Response";

const { GraphQLUpload, FileUpload } = require('graphql-upload')
export const CreateUser = {
    type: UserType,
    args: {
        userName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        file: { type: GraphQLUpload }
    },
    async resolve(parent: any, args: any, context: any) {
        try {
            const existingUser: unknown = await User.findOne({ email: args.email }).or([{ userName: args.userName }])
            if (existingUser) {
                throw new DuplicateError("User already exists")
            }
            const imageUrl = await readFile(args.file)
            bcrypt
                .genSalt(10)
                .then(salt => {
                    return bcrypt.hash(args.password!, salt)
                })
                .then(async hash => {
                    const { userName, email, password, bio } = args
                    const user = new User({
                        userName,
                        email,
                        profilePic: imageUrl,
                        password: hash,
                        bio,
                        createdAt: Date.now(),
                        createdBy: context.userId
                    })
                    return user.save()
                })
                .catch(err => console.error("err", err.message))
        }
        catch (err) {
            console.log(err)

            return new InternalServerError(err as string)
        }
    }
}


export const LoginUser = {
    type: UserLoginResponse,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent: any, args: IUser, context: Context) {
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
            const userCommunities = await Community.find({
                communityMembers: {
                    $in: [existingUser._id]
                }
            }).select("_id")
            const token = jwt.sign({ id: existingUser._id, email: existingUser.email, userName: existingUser.userName, bio: existingUser.bio, profilePicture: existingUser.profilePic, communities: userCommunities }, process.env.SECRET_KEY!)
            context().res.cookie('auth', token, { maxAge: 3600000, httpOnly: true, sameSite: "lax" })
            return { status: "OK", token }
        }
        catch (err) {
            console.log(err)
            return err
        }
    }
}

export const Follow = {
    type: RequestResponse,
    args: {
        userId: { type: GraphQLID }
    },
    async resolve(parent: any, args: { userId: string }, context: Context) {
        try {
            await User.findByIdAndUpdate(args.userId, {
                $push: {
                    followers: (context().req as UserLoginRequest).user.id
                }
            }, { new: true })
            return {
                msg: "request successful"
            }
        }
        catch (err) {
            console.log(err)
            return err
        }
    }
}

export const Unfollow = {
    type: RequestResponse,
    args: {
        userId: { type: GraphQLID }
    },
    async resolve(parent: any, args: { userId: string }, context: Context) {
        try {
            await User.findByIdAndUpdate(args.userId, {
                $pull: {
                    followers: (context().req as UserLoginRequest).user.id
                }
            }, { new: true })
            return {
                msg: "request successful"
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}




