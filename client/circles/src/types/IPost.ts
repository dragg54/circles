
export interface IPost{
    postId?: string,
    parentPostId?: string,
    topic?: string
    body?: string,
    communityName?:string,
    likedBy?:string
    dislikedBy?:string
    createdBy?:string
    createdAt?:string
    updatedBy?:string
    updatedAt?:string
}