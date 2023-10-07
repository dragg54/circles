import React from 'react'
import SubmitButton from '../Buttons/SubmitButton'
import Form from './Form'
import { useNavigate } from 'react-router-dom'

export const SignupForm = ({page, setPage}: {page: number, setPage: React.Dispatch<React.SetStateAction<number>>}) => {
    return (
      <Form>
        {page==1?<Bio {...{page, setPage}}/> : <ChooseCommunity {...{page, setPage}}/>}
      </Form>
    )
  }
  const Bio = ({page, setPage}: {page:number, setPage: React.Dispatch<React.SetStateAction<number>>}) =>{
    return(
      <div className='w-full  flex flex-col gap-3'>
      <h1 className='self-start text-xl font-extrabold w-full border-b border-gray-300 py-3'>Set Up Account {`${page}/2`}</h1>
        <input type="text" placeholder='Username'/>
        <input type="text" name="email" id="" placeholder='Email'/>
        <input type="password" name="email" id="" placeholder='Password'/>
        <textarea name="" id="" cols={20} rows={5} placeholder='Bio'></textarea>
        <SubmitButton name="NEXT" handleSubmit={()=>setPage(2)}/> 
      </div>
    )
  }
  
  const ChooseCommunity = ({page, setPage}: {page:number, setPage: React.Dispatch<React.SetStateAction<number>>}) =>{
    const navigate = useNavigate()
    return(
      <div className='w-full flex flex-col gap-3'>
      <h1 className='self-start text-xl font-extrabold w-full border-b border-gray-300 py-3'>Select Communities {`${page}/2`}</h1>
        <div className='flex items-center'>
          <input type="checkbox" name="Music" value="Music" className='mr-2 w-4 h-4' />
          <label htmlFor="Music">Music (23,000)</label>
        </div>
        <div className='flex items-center'>
          <input type="checkbox" name="Tech" value="Tech" className='mr-2 w-4 h-4' />
          <label htmlFor="Tech">Tech (24000)</label>
        </div>
        <div className='flex items-center'>
          <input type="checkbox" name="Music" value="Music" className='mr-2 w-4 h-4' />
          <label htmlFor="Music">Politics (25000)</label>
        </div>
        <div className='flex items-center'>
          <input type="checkbox" name="Music" value="Music" className='mr-2 w-4 h-4' />
          <label htmlFor="Music">Education (26000)</label>
        </div>
        <div className='flex items-center'>
          <input type="checkbox" name="Music" value="Music" className='mr-2 w-4 h-4' />
          <label htmlFor="Music">Movie (27000)</label>
        </div>
        <div className='flex items-center'>
          <input type="checkbox" name="Music" value="Music" className='mr-2 w-4 h-4' />
          <label htmlFor="Music">Sport (28000)</label>
        </div>
        <SubmitButton name={"SAVE"} handleSubmit={()=>navigate("/")}/>
      </div>
    )
  }
  

export default SignupForm