import { LiaCommentAlt } from "react-icons/lia"
import { SlLike } from "react-icons/sl"
import { UserAuth } from "../../types/User"
import { useDispatch, useSelector } from "react-redux"
import { likePost } from "../../redux/Post"
import { LikePost, UnLikePost } from "../../graphql/mutations/post"
import { useMutation } from "@apollo/client"
import { IPost } from "../../types/IPost"

type UserState = {
    auth: {
        user: UserAuth
    }
}

export const PostReactions = ({ post }: { post: IPost }) => {
    const user = useSelector(state => (state as UserState).auth)
    const [likePostMutation, { data: likePostData, loading: likePostLoading, error: likePostError }] = useMutation(LikePost)
    const [unlikePostMutation, { data: unlikePostData, loading: unlikePostLoading, error: unlikePostError }] = useMutation(UnLikePost)
    const dispatch = useDispatch()
    return (
        <div className='flex justify-start mt-3 items-center gap-3'>
            <div>
                <p className={` flex items-center gap-3`}><SlLike className={`w-5 overflow-hidden h-5 ${post?.likedBy?.includes(user?.user?.id as never) ? "text-red-600" : "text-gray-600"}`} onClick={
                    function () {
                        if (post?.likedBy?.includes(user.user.id as never)) {
                            unlikePostMutation({
                                variables: {
                                    postId: post._id
                                }
                            })
                        }
                        else {
                            likePostMutation({
                                variables: {
                                    postId: post._id
                                }
                            })
                        }
                        if (!likePostError || !unlikePostError) {
                            dispatch(likePost({ postId: post._id.toString(), userId: user.user.id }))
                        }
                    }
                } />500 Likes</p>
            </div>
            <div>
                <div>
                    <p className='flex items-center gap-3'><LiaCommentAlt className="w-6 h-6" /> 200 Comments</p>
                </div>
            </div>
        </div>
    )
}