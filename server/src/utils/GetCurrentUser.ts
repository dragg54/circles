import { Request, Response } from 'express'
import { IUser } from '../types/User';
import { User } from '../models/User';

export async function getUser(email: string): Promise<IUser | null> {
    try {
        const user: unknown = await User.findOne({ email })
        if (user) {
            return user as IUser;
        }
    }
    catch (err) {
        console.log(err)
    }
    return null
}