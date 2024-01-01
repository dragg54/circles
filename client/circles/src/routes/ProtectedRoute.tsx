import React from 'react'
import { useSelector } from 'react-redux'
import { UserState } from '../types/States'
import Signin from '../pages/Signin'

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const user = useSelector(state => (state as UserState).auth)
 if(user.user){
  return (
    <>
      {children}
    </>
 )}
else{
  return (
    <Signin />
    )
}}

export default ProtectedRoute