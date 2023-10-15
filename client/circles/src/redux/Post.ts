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
        fetchPosts: (state, action: { payload: { posts: PostState []} }) => {
            console.log(action.payload.posts)
            // if(action.payload && action.payload.filter){
            //     const community = (state as [PostState]).filter((posts)=> (posts.community as PostCommunity).name != action.payload.filter.toString())
            //     return [...state, ...community]
            // }
            return action.payload.posts
        },
        addPost: (state, action: { payload:{post: PostState | IPost}}) =>{
            console.log(state)
           const newPost = action.payload.post
           const lastPostId = state[state.length - 1]._id
           if(lastPostId){
            newPost._id = lastPostId + 1
            console.log("newPost", newPost._id)
           }
           else{
            newPost._id = 1
           }
           console.log([...state, newPost])
           return [...state, newPost]
        },
    },
});

export const { fetchPosts, addPost } = postSlice.actions;
export default postSlice.reducer;