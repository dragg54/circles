export interface UserAuth{
    id: string,
    token: string,
    userName: string,
    profilePicture: string,
    email: string,
    bio: string
}

export interface IUser extends UserAuth{
    communities: [],
    following: [],
    followers: [],
    error: string
}

