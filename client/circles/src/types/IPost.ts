
export interface IPost{
    _id: number | null,
    parentPostId: string,
    topic: string
    body: string,
    comments: IPost[] | null,
    image: File | null | string,
    community: string | PostCommunity | null
    error: string,
    user: {
        userName: string,
        profilePic: string
    }
    likedBy: []
    dislikedBy:[]
    createdBy:string
    createdAt:number | null
    updatedBy:string | null
    updatedAt:number | null
}

export type PostCommunity = {
    _id: string,
    communityName: string
}

export type NewPost = Omit<IPost, 'createdBy'| 'createdAt'| 'updatedAt'| 'updatedBy' | 'likedBy' | 'dislikedBy'>

export interface PostComment extends Omit<IPost, 'createdBy'| 'createdAt'| 'updatedAt'| 'updatedBy' | 'likedBy' | 'dislikedBy'>{
    parentId: string
}


