import React, { useEffect, useState } from 'react'
import SubmitButton from '../Buttons/SubmitButton'
import Form from './Form'
import { useNavigate } from 'react-router-dom'
import { GET_COMMUNITIES } from '../../graphql/queries/community'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_NEW_USER } from '../../graphql/mutations/user'
import { LiaCommentSlashSolid } from 'react-icons/lia'
import { Community } from '../../types/Community'
import { PostCommunity } from '../../types/IPost'
import { UserState } from '../../types/States'

type Profile = {
  userName: string,
  email: string,
  bio: string,
  password: string,
  community: string[]
}

export const SignupForm = ({page, setPage}: {page: number, setPage: React.Dispatch<React.SetStateAction<number>>}) => {
  const [profile, setprofile] = useState<Profile>({
    userName: "",
    email: "",
    bio: "",
    password: "",
    community: []
  })

  const handleChange = (e: { target: { name: string; value: string } }) =>{
    setprofile({...profile, [e.target.name]: e.target.value})
  }
    return (
      <Form>
        {page==1?<Bio {...{page, setPage, profile, setprofile}}/> : <ChooseCommunity {...{page, setPage, profile, setprofile}}/>}
      </Form>
    )
  }
  const Bio = ({page, setPage, setprofile, profile}: {page:number, setPage: React.Dispatch<React.SetStateAction<number>>, profile:Profile, setprofile:React.Dispatch<React.SetStateAction<Profile>> }) =>{
    const handleChange = (e: { target: { name: string; value: string } }) =>{
      setprofile({...profile, [e.target.name]: e.target.value})
      console.log(profile)
    }
    return(
      <div className='w-full  flex flex-col gap-3'>
      <h1 className='self-start text-xl font-extrabold w-full border-b border-gray-300 py-3'>Set Up Account {`${page}/2`}</h1>
        <input onChange={handleChange} value={profile.userName} type="text" name="userName" placeholder='Username'/>
        <input onChange={handleChange} value={profile.email}  type="text" name="email" id="" placeholder='Email'/>
        <input onChange={handleChange} value={profile.password}  type="password" name="password" id="" placeholder='Password'/>
        <textarea onChange={handleChange} value={profile.bio}  name="bio" id="" cols={20} rows={5} placeholder='Bio'></textarea>
        <SubmitButton name="NEXT" handleSubmit={()=>setPage(2)}/> 
      </div>
    )
  }
  
  const ChooseCommunity = ({page, profile}: {page:number, profile: {
    userName: string,
    email: string,
    password: string,
    community: string[],
    bio: string
  }, setPage: React.Dispatch<React.SetStateAction<number>>}) =>{
    const navigate = useNavigate()
    const [community, setCommunity] = useState<PostCommunity[]>([])
    const { data: communities, error, loading } = useQuery(GET_COMMUNITIES)
    const [ createUser,{ error: createUserError, loading: createUserLoading}] = useMutation(CREATE_NEW_USER)

    function handleCommunityChange(e: { target: { checked: boolean; value: string, name: string, id: string } }){
      if(e.target.checked){
        setCommunity({...community, [e.target.name]: e.target.id})
      }
      else{
        const filtered = community.filter((comm)=> comm[e.target.name as keyof PostCommunity] != e.target.id)
        setCommunity(filtered)
      }
    }

   async function saveUser(){
      try{
        await createUser({
          variables:{
           ...profile, communities: Object.values(community)
          }
        })
       if(!createUserError && !createUserLoading){
        navigate("/signin")
       }
      }
      catch(err){
        console.log(err)
      }
    }

    return(
      <div className='w-full flex flex-col gap-3'>
      <h1 className='self-start text-xl font-extrabold w-full border-b border-gray-300 py-3'>Select Communities {`${page}/2`}</h1>
       {!loading && !error && communities && (communities.communities as Community[]).length && communities.communities.map((comm: { map: React.Key; communityName: string, _id: string }, index: React.Key | number)=>{
        return(
          <div className='flex items-center' key={index}>
          <input type="checkbox" id={comm._id} onChange={handleCommunityChange} name={comm.communityName} value={(community.length > 0 && community.find((comms)=> comms[comm.communityName as keyof PostCommunity] == comm._id))[comm.communityName as keyof PostCommunity]}  checked={community.length && community.some((x)=> x[comm.communityName as keyof PostCommunity] == comm._id)} className='mr-2 w-4 h-4' />
            <label htmlFor={comm.communityName}>{comm.communityName} (23,000)</label>
          </div>
        )
       })}
        <SubmitButton name={"SAVE"} handleSubmit={()=>{
          saveUser()
        }}/>
      </div>
    )
  }
  

export default SignupForm