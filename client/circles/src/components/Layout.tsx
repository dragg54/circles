import React from 'react'
import Header from './Header'
import User from './User'

const Layout = ({children}: {children: React.ReactNode}) => {
  console.log(children)
  return (
    <div className='w-screen z-30'>
        <Header/>
        <body className='relative'>
          <User />        
          {children}
        </body>
    </div>
  )
}

export default Layout