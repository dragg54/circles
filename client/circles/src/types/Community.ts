export enum Community{
    Tech,
    Music,
    Politics,
    Sport,
    Education,
    Business,
}

export type CommunityType = {
    _id: string,
    communityName: string,
    communityMembers: string[]
}