import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { CreateUser, LoginUser } from './Mutations/User'
import { GetCommunityPosts, GetPosts, GetPostsById, GetPostsByUserId } from './Queries/Post'
import { CreatePost, DeletePost, UpdatePost } from './Mutations/Post'
import { AddCommunityMembers, CreateCommunity, DeleteCommunity, JoinCommunities, RemoveCommunityMember, UpdateCommunity } from './Mutations/Community'
import { GetCommunities, GetCommunitiesById, GetCommunitiesByUserId } from './Queries/Community'

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        post: GetPostsById,
        posts: GetPosts,
        postsByUser: GetPostsByUserId,
        communities: GetCommunities,
        userCommunities: GetCommunitiesByUserId,
        allCommunityPosts: GetCommunityPosts
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createPost: CreatePost,
        createUser: CreateUser,
        deletePost: DeletePost,
        loginUser: LoginUser,
        updatePost: UpdatePost,
        createCommunity: CreateCommunity,
        updateCommunity: UpdateCommunity,
        deleteCommunity: DeleteCommunity,
        addCommunityMember: AddCommunityMembers,
        deleteCommunityMember: RemoveCommunityMember,
        joinCommunities: JoinCommunities
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})