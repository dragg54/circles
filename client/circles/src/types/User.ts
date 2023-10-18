export interface UserAuth{
    id: string,
    token: string,
    user: IUser
}

export interface IUser{
    userName: "",
    profilePicture: "",
    communities: [],
    following: [],
    followers: [],
    error: string
}

