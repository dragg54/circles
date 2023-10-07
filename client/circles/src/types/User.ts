export interface UserAuth{
    token: string,
    userName: string,
    profilePicture: string,
    email: string,
    bio: string
}

export interface IUser extends UserAuth{
    id:string,
    communities: [],
    following: [],
    followers: [],
    error: string
}

