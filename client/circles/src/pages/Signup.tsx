import React, { useState } from 'react'
import { SignupForm } from '../components/Form'

const Signup = () => {
 const [page, setPage] = useState(1)
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-white '>
      <div className='w-2/3 h-screen  overflow-y-hidden object-cover flex justify-center items-center '>
        <img src={`${page==1? 'images/signup.svg' : 'images/community.svg'}`} className='bg-black' alt="" />
      </div>
       <div className="w-1/3 flex justify-center items-start h-full mt-20  mx-3 rounded-sm">
       <SignupForm {...{page, setPage}}/>
       </div>
    </div>
  )
}

export default Signup