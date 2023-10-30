import { createSlice } from "@reduxjs/toolkit";
import { PostState } from "../types/States";
import { IPost } from "../types/IPost";

const postSlice = createSlice({
    name: 'post',
    initialState: [{
        _id: null,
        parentPostId: '',
        topic: '',
        body: '',
        image:null,
        community: null,
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
        likePost:(state, action: {payload:{ userId: string, postId: string}})=>{
            const post = state.find(post => post._id == action.payload.postId)
            const postIndex = state.findIndex(pst => pst._id == action.payload.postId)
            if(post && post.likedBy.length && post.likedBy.includes(action.payload.userId)){
                state[postIndex] = null
                const likeIndex = post.likedBy.findIndex((x)=> x == action.payload.userId)
                post.likedBy.splice(likeIndex, 1)
                state[postIndex] = post
            }
            else if(post){
                state[postIndex] = null
                post.likedBy.push(action.payload.userId)
                state[postIndex] = post
            }
            console.log(state)
            return state
        },
    },
});

export const { fetchPosts, addPost, likePost } = postSlice.actions;
export default postSlice.reducer;