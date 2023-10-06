import React from 'react'
import { SigninForm } from '../components/Form'

const Signin = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-white '>
          <div className='w-2/3 h-screen bg-black overflow-y-hidden object-cover flex justify-center items-center '>
            <img src= 'images/register.svg'  className='bg-black' alt="" />
          </div>
           <div className="w-1/3 h-full flex justify-center items-start pt-20 mx-3   shadow-slate-500 rounded-md">
            <SigninForm />
           </div>
        </div>
    )
}

export default Signin