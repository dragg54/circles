import { Link, useNavigate } from "react-router-dom"
import ProfilePicture from "../ProfilePicture"
import { IPost } from "../../types/IPost"

export const PostHeader = ({post}:{post: IPost}) => {
    
    return (
        <div className='w-full flex justify-between items-center border-b border-gray-200 shadow-sm mb-4 pb-4'>
            <Link to={'/user/'+post.createdBy} className='items-center flex justify-between' >
                <ProfilePicture height={12} width={12} profilePicture={post.user?.profilePic}/>
                <p className='ml-4'>{post.user?.userName}</p>
            </Link>
            <div className='text-gray-400'>
                June 5, 2023
            </div>
        </div>
    )
}