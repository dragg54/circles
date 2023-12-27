import { PostContent } from "./PostContent"
import { PostReactions } from "./PostReaction"
import { PostHeader } from "./Postheader"

export const ChildPost = ({ topic, content }: { topic: string, content: string }) => {
    return (
        <div className='cursor-pointer w-11/12 self-end bg-white rounded-md shadow-md p-4 h-auto mb-5 border-l-4 border-r border-t border-[#333A44] border-b-4 shadow-gray-400 '>
            <PostHeader/>
            <PostContent content={content} image=''/>
            <PostReactions />
        </div>
    )
}