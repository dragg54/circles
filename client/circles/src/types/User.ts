import { CommunityType } from "./Community"

export interface UserAuth{
    token: string,
    user: IUser
}

export interface IUser{
    id: string
    userName: string,
    profilePicture: string,
    communities: CommunityType[],
    following: [],
    followers: [],
    error: string
}

