import { useQuery } from "@apollo/client"
import { useDispatch, useSelector } from "react-redux"
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
import LoadingSpinner from "../Loaders/LoadingSpinner"
import { Link } from "react-router-dom"

type PostType = {
    post: IPost[]
}
type UserState = {
    auth: UserAuth
}
const PostComp = ({width}: {width:number | string}) => {
    const user = useSelector(state => (state as UserState).auth).user
    const { data, error, loading } = useQuery(GET_ALL_POSTS, {
        variables: {
            community: user?.communities?.map((comm)=> (comm as CommunityType)._id) 
        }
    })
    const dispatch = useDispatch()
    const posts = useSelector(state => (state as PostType).post)
    useEffect(()=>{
        dispatch(fetchPosts({posts: (data?.allCommunityPosts as PostState[])}))
    }, [data, loading, error, user])
    if (loading){
        return <LoadingSpinner {...{loading}}/>
    }
    else{
    return (
        <>
        {!loading && posts &&  posts.map((post: IPost) => {
            return (
                <Link to={`/post/${post._id}`}><div key={post._id}  className={`cursor-pointer w-${width} bg-white rounded-md shadow-md p-4 h-auto mb-5 border-l-4 border-r border-t border-[#333A44] border-b-4 shadow-gray-400 `}>
                    <PostHeader post={post} />
                    <PostTopic topic={post.topic} />
                    <PostContent content={post.body} image={(post.image as string)} />
                    <PostReactions  post = {post}/>
                </div></Link>
            )
        })}
        </>
        )
    }
}

export default PostComp