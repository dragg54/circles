/* eslint-disable react-hooks/rules-of-hooks */
import { PostHeader } from "./Postheader"
import { PostTopic } from "./PostTopic"
import { PostContent } from "./PostContent"
import { PostReactions } from "./PostReaction"
import { IPost } from "../../types/IPost"
import { Link } from "react-router-dom"
import LoadingSpinner from "../Loaders/LoadingSpinner"
import PostComment from "./PostComment"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "../../redux/Post"
import { PostState } from "../../types/States"
import { useEffect } from "react"

const PostComp = ({ posts, width, loading }: { posts: IPost[], width: number | string, loading: boolean }) => {
    const dispatch = useDispatch()
    const _posts = useSelector(state => (state as {
        post: IPost[]
    }).post)
    if (loading) {
        return <LoadingSpinner loading />
    }
    useEffect(() => {
        dispatch(fetchPosts({ posts: (posts as PostState[]) }))
    }, [])
    return (
        <>
            {_posts && _posts.length > 0 && _posts.map((post: IPost) => {
                if (!post.parentPostId) return (
                        <div key={post._id} className={`cursor-pointer w-${width} bg-white rounded-md shadow-md p-4 h-auto mb-5 border-l-4 border-r border-t border-[#333A44] border-b-4 shadow-gray-400 `}>
                            <Link to={`/post/${post._id}`} className="w-full">
                                <PostHeader post={post} />
                                <PostTopic topic={post.topic} />
                                <PostContent content={post.body} image={(post.image as string)} />
                            </Link>
                            <PostReactions post={post} />
                            {post.comments && post.comments.map((comment) => {
                                return (
                                    <>
                                        <PostComment comment={comment} key={comment._id} />
                                    </>
                                )
                            })}
                        </div>
                )
            })}
        </>
    )
}


export default PostComp