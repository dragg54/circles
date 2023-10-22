import ProfilePicture from "../ProfilePicture"

export const PostHeader = () => {
    return (
        <div className='w-full flex justify-between items-center border-b border-gray-200 shadow-sm mb-4 pb-4'>
            <div className='items-center flex justify-between'>
                <ProfilePicture height={12} width={12}/>
                <p className='ml-4'>Albert</p>
            </div>
            <div className='text-gray-400'>
                June 5, 2023
            </div>
        </div>
    )
}