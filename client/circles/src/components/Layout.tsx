import React from 'react'
import Header from './Header'

const Layout = ({children}: {children: React.ReactNode}) => {
  console.log(children)
  return (
    <div className='w-screen z-30'>
        <Header/>
        {children}
    </div>
  )
}

export default Layout