import { IPost, PostCommunity } from "./IPost"

export type AuthState = {
    auth: {
        id: string,
        userName: string,
        token: string,
        profilePicture: string
    }
}

export interface PostState extends Omit<IPost, 'community'>{
    community: PostCommunity
}