import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { CreateUser, LoginUser } from './Mutations/User'
import { GetPosts, GetPostsById, GetPostsByUserId } from './Queries/Post'
import { CreatePost, DeletePost, UpdatePost } from './Mutations/Post'
import { AddCommunityMembers, CreateCommunity, DeleteCommunity, RemoveCommunityMember, UpdateCommunity } from './Mutations/Community'
import { GetCommunities } from './Queries/Community'

const RootQuery = new GraphQLObjectType({
    name: "Rootquery",
    fields: {
        getPost: GetPostsById,
        getPosts: GetPosts,
        getPostsByUserId: GetPostsByUserId,
        getCommunities: GetCommunities
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
        deleteCommunityMember: RemoveCommunityMember
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})