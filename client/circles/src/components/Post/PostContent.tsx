export const PostContent = ({ content, image }: { content: string, image: string }) => {
    return (
          <div className='w-full mt-6'>
               {image?<div className='max-h-[400px] w-full object-cover overflow-hidden mb-5'>
               <img src={'http://'+image} alt="" className='h-full w-full'/>
               </div>: ""}
            <p className='text-gray-500 w-full border-b border-gray-200 shadow-sm pb-4'>{content}
           </p>
          </div>
       )
   }