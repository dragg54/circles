export enum Community{
    Tech = "Tech",
    Music = "Music",
    Politics = "Politics",
    Sport = "Sport",
    Education = "Education",
    Business = "Business",
    Fashion = "Fashion",
    Movie = "Movie",
    Travel = "Travel"
}

export type CommunityType = {
    _id: string,
    communityName: string,
    communityMembers: string[]
}