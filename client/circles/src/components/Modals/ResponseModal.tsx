import React from 'react'
import { useSelector } from 'react-redux'

type ResponseModalState = {
        responseModal: {
            openResponseModal: boolean,
            msg: string
        }
    }
const ResponseModal = ({message}: {message: string}) => {
    const responseModal = useSelector(state => (state as ResponseModalState).responseModal)
  return (
    <div className={`p-3 bg-white top-20 rounded-md left-6 absolute z-40 shadow-md rounded-sm border border-gray-300 ${responseModal.openResponseModal? 'flex':'hidden'} justify-start items-center`}>
        <p className='text-base text-green-900'>{responseModal.msg}</p>
    </div>
  )
}

export default ResponseModal