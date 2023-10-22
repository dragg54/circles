import { LiaCommentAlt } from "react-icons/lia"
import { SlLike } from "react-icons/sl"
import { UserAuth } from "../../types/User"
import { useSelector } from "react-redux"

type UserState = {
    auth: UserAuth
}

export const PostReactions = ({liked}: {liked: []}) => {
    const user = useSelector(state => (state as UserState).auth)
    return (
        <div className='flex justify-start mt-3 items-center gap-3'>
            <div>
                <p className={` flex items-center gap-3 ${liked?.includes(user.id as never)? "bg-red-600": ""}`}><SlLike className="w-5 h-5" onClick={
                    function(){

                    }
                }/>500 Likes</p>
            </div>
            <div>
                <div>
                    <p className='flex items-center gap-3'><LiaCommentAlt className="w-6 h-6" /> 200 Comments</p>
                </div>
            </div>
        </div>
    )
}