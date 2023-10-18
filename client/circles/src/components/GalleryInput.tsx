import React from 'react'
import { TfiGallery } from 'react-icons/tfi'

const GalleryInput = ({handleImageChange}: {handleImageChange:React.ChangeEventHandler<HTMLInputElement>}) => {
    return (
        <div className='relative overflow-hidden'>
            <label><TfiGallery className="w-8 h-8 cursor-pointer text-gray-600" />
                <input type='file' className='cursor-pointer hidden z-30 h-10' onChange={handleImageChange}/>
            </label>
        </div>
    )
}

export default GalleryInput