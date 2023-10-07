import { createSlice } from "@reduxjs/toolkit";
import { IPost } from "../types/IPost";

const postSlice = createSlice({
    name: 'user',
    initialState: [{
        postId: '',
        parentPostId: '',
        topic: '',
        body: '',
        communityName: '',
        error: '',
        likedBy: '',
        dislikedBy: '',
        createdBy: '',
        createdAt: '',
        updatedBy: '',
        updatedAt: ''
    }],
    reducers: {
        fetchPost: (_, action: { payload: { post: IPost  } }) => {
            return [action.payload.post]
        },
        addPost: (state, action: { payload:{post: IPost}}) =>{
           const newPost = action.payload.post
           newPost.postId = state[state.length - 1].postId
           newPost.createdBy = ""
           newPost.createdAt = ""
           return [...state, newPost]
        }
    },
});

export const { fetchPost, addPost } = postSlice.actions;
export default postSlice.reducer;