
export interface IPost{
    _id: number | null,
    parentPostId: string,
    topic: string
    body: string,
    community: string | PostCommunity | null
    error: string,
    userName: string,
    likedBy: []
    dislikedBy:[]
    createdBy:string
    createdAt:number | null
    updatedBy:string | null
    updatedAt:number | null
}

export type PostCommunity = {
    id: string,
    name: string
}

export type NewPost = Omit<IPost, 'createdBy'| 'createdAt'| 'updatedAt'| 'updatedBy' | 'likedBy' | 'dislikedBy'>


