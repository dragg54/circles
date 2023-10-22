import { createSlice } from "@reduxjs/toolkit";
import { PostState } from "../types/States";
import { IPost } from "../types/IPost";
import { IUser } from "../types/User";

const postSlice = createSlice({
    name: 'post',
    initialState: [{
        _id: null,
        parentPostId: '',
        topic: '',
        body: '',
        image:null,
        community: null,
        userName: '',
        error: '',
        likedBy: [],
        dislikedBy: [],
        createdBy: '',
        createdAt: null,
        updatedBy: '',
        updatedAt: null
    }],
    reducers: {
        fetchPosts: (state, action: { payload: { posts: PostState [] }}) => {
            const {posts} = action.payload
            console.log(posts)
            return posts
        },
        addPost: (state, action: { payload:{post: PostState | IPost}}) =>{
           const newPost = action.payload.post
           const lastPostId = state[state.length - 1]._id
           if(lastPostId){
            newPost._id = lastPostId + 1
           }
           else{
            newPost._id = 1
           }
           return [...state, newPost]
        },
        likePost:(state, action: {payload:{ user: IUser, postId: string}})=>{
            const post = state.find(post => post._id == action.payload.postId)
            if(post && !post.likedBy.includes(action.payload.user)){
                post.likedBy.push(action.payload.user)
            }
            return state
        },
        unLikePost:(state, action: {payload:{ user: IUser, postId: string}})=>{
            const post = state.find(post => post._id == action.payload.postId)
            if(post && post.likedBy.includes(action.payload.user) && post){
                post.likedBy.pop()
            }
            return state
        },
    },
});

export const { fetchPosts, addPost } = postSlice.actions;
export default postSlice.reducer;