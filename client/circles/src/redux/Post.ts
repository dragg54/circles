import { createSlice } from "@reduxjs/toolkit";
import { IPost } from "../types/IPost";

const postSlice = createSlice({
    name: 'user',
    initialState: [{
        postId: null,
        parentPostId: '',
        topic: '',
        body: '',
        communityName: '',
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
        fetchPost: (_, action: { payload: { post:  IPost  } }) => {
            return [action.payload.post]
        },
        addPost: (state, action: { payload:{post: IPost}}) =>{
           const newPost = action.payload.post
           const lastPostId = state[state.length - 1].postId
           if(lastPostId){
            newPost.postId = Number(lastPostId) + 1
           }
           else{
            newPost.postId = 1
           }
           return [...state, newPost]
        },
    },
});

export const { fetchPost, addPost } = postSlice.actions;
export default postSlice.reducer;