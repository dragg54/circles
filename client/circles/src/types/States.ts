import { CommunityType } from "./Community"
import { IPost, PostCommunity } from "./IPost"
import { UserAuth } from "./User"

export type AuthState = {
    auth: {
        user: {
            id: string,
            userName: string,
            token: string,
            profilePicture: string,
            communities: CommunityType[]
        }
    }
}

export interface PostState extends Omit<IPost, 'community userName'> {
    community: PostCommunity
    user: {
        userName: string,
        profilePic: string
    }
}

export type UserState = {
    auth: UserAuth
}