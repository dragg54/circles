import React from 'react'

const Form = ({ children }: { children: React.ReactNode }) => {
    return (
      <form className='w-full p-4 py-5 rounded-md flex flex-col bg-white gap-3 border border-gray-300 shadow-sm shadow-slate-300'>
        {children}
      </form>
    )
  }

export default Form