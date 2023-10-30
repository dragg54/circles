export interface UserAuth{
    token: string,
    user: IUser
}

export interface IUser{
    id: string
    userName: string,
    profilePicture: string,
    communities: [],
    following: [],
    followers: [],
    error: string
}

