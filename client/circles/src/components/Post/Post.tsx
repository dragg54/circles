import { useQuery } from "@apollo/client"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { GET_ALL_POSTS } from "../../graphql/queries/post"
import { CommunityType } from "../../types/Community"
import { PostState } from "../../types/States"
import { useEffect } from "react"
import { fetchPosts } from "../../redux/Post"
import { PostHeader } from "./Postheader"
import { PostTopic } from "./PostTopic"
import { PostContent } from "./PostContent"
import { PostReactions } from "./PostReaction"
import { IPost } from "../../types/IPost"
import { UserAuth } from "../../types/User"

type PostType = {
    post: IPost[]
}
type UserState = {
    auth: UserAuth
}
export const Post = ({width}: {width:number | string}) => {
    const user = useSelector(state => (state as UserState).auth).user
    const navigate = useNavigate()
    function goToPost() {
        navigate("/post")
    }
    const { data, error, loading } = useQuery(GET_ALL_POSTS, {
        variables: {
            community: user.communities?.map((comm)=> (comm as CommunityType)._id) 
        }
    })
    const dispatch = useDispatch()
    const posts = useSelector(state => (state as PostType).post)
    useEffect(()=>{
        dispatch(fetchPosts({posts: (data?.allCommunityPosts as PostState[])}))
    }, [data, loading, error, user])
    if (loading){
        return <p>Loading</p>
    }
    return (
        <>
        {!loading && posts &&  posts.map((post: IPost) => {
            return (
                <div key={post._id} onClick={goToPost} className={`cursor-pointer w-${width} bg-white rounded-md shadow-md p-4 h-auto mb-5 border-l-4 border-r border-t border-[#333A44] border-b-4 shadow-gray-400 `}>
                    <PostHeader />
                    <PostTopic topic={post.topic} />
                    <PostContent content={post.body} image={(post.image as string)} />
                    <PostReactions  liked = {post.likedBy}/>
                </div>
            )
        })}
        </>
        )
}