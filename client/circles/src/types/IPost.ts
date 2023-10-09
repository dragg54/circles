
export interface IPost{
    postId: number,
    parentPostId: string,
    topic: string
    body: string,
    communityName:string
    error: string,
    userName: string,
    likedBy: []
    dislikedBy:[]
    createdBy:string
    createdAt:number | null
    updatedBy:string | null
    updatedAt:number | null
}

export type NewPost = Omit<IPost, 'createdBy'| 'createdAt'| 'updatedAt'| 'updatedBy' | 'likedBy' | 'dislikedBy'>


