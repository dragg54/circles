import { useMutation } from '@apollo/client'
import React, { ChangeEvent, useState } from 'react'
import { LoginUser } from '../../graphql/mutations/user'
import { useNavigate } from 'react-router-dom'
import Form from './Form'
import SubmitButton from '../Buttons/SubmitButton'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuth } from '../../redux/Auth'
import { IUser } from '../../types/User'
import { getUser } from '../../redux/User'

type UserState = {
  user: IUser
}


export const SigninForm = () =>{
    interface LoginType extends   HTMLInputElement {
      email?: string,
      password?: string
    }
    const [ loginUserMutation, {error, loading} ] =  useMutation(LoginUser)
    const [loginDetails, setLoginDetails ] = useState({email: "", password: ""})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleformChange(e: ChangeEvent<HTMLInputElement>){
      e.preventDefault()
      const {value, name} = e.target as LoginType
      setLoginDetails({...loginDetails, [name]: value})
    }
    const handleMutation = async() =>{
    try {
      const result =  await loginUserMutation({
        variables: {
          email: loginDetails.email,
          password: loginDetails.password
        },
      });
      const response = result.data.loginUser
     if(!error && !loading){
      dispatch(fetchAuth({token: response.token}))
      localStorage.setItem("auth", JSON.stringify(response.token))
      navigate("/posts")
     }
    } catch (e) {
      // Handle errors
      console.error('Mutation error:', e);
    }  }
    return(
     <Form>
       <div className='w-full  flex flex-col gap-3'>
    <h1 className='self-start text-4xl font-extrabold w-full border-b border-gray-300 py-3'>Sign in</h1>
      <input type="text" name="email" id="" placeholder='Email' onChange={handleformChange} value={loginDetails.email}/>
      <input type="password" name="password" id="" placeholder='Password' value={loginDetails.password} onChange={handleformChange}/>
      <SubmitButton name="LOGIN" handleSubmit={handleMutation}/> 
    </div>
    <p>Don't have an account? <span className='font-bold cursor-pointer' onClick={()=>{
      navigate("/signup")
    }}>Create</span></p>
     </Form>
    )
}

export default SigninForm