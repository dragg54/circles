import React, { useEffect, useState } from 'react'
import SubmitButton from '../Buttons/SubmitButton'
import Form from './Form'
import { useNavigate } from 'react-router-dom'
import { GET_COMMUNITIES } from '../../graphql/queries/community'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_NEW_USER } from '../../graphql/mutations/user'
import { LiaCommentSlashSolid } from 'react-icons/lia'

export const SignupForm = ({page, setPage}: {page: number, setPage: React.Dispatch<React.SetStateAction<number>>}) => {
  const [profile, setprofile] = useState({})

  const handleChange = (e: { target: { name: string; value: string } }) =>{
    setprofile({...profile, [e.target.name]: e.target.value})
  }
    return (
      <Form>
        {page==1?<Bio {...{page, setPage, profile, setprofile}}/> : <ChooseCommunity {...{page, setPage, profile, setprofile}}/>}
      </Form>
    )
  }
  const Bio = ({page, setPage}: {page:number, setPage: React.Dispatch<React.SetStateAction<number>>}) =>{
    const [profile, setprofile] = useState({
      userName: "",
      email: "",
      bio: "",
      password: ""
    })

    const handleChange = (e: { target: { name: string; value: string } }) =>{
      setprofile({...profile, [e.target.name]: e.target.value})
    }
    return(
      <div className='w-full  flex flex-col gap-3'>
      <h1 className='self-start text-xl font-extrabold w-full border-b border-gray-300 py-3'>Set Up Account {`${page}/2`}</h1>
        <input type="text" name="userName" placeholder='Username'/>
        <input type="text" name="email" id="" placeholder='Email'/>
        <input type="password" name="password" id="" placeholder='Password'/>
        <textarea name="profile" id="" cols={20} rows={5} placeholder='profile'></textarea>
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
    const [community, setCommunity] = useState([{}])
    const { data: communities, error, loading } = useQuery(GET_COMMUNITIES)
    const [ createUser,{ error: createUserError, loading: createUserLoading}] = useMutation(CREATE_NEW_USER)

    function handleCommunityChange(e: { target: { checked: boolean; value: string, name: string, id: string } }){
      if(e.target.checked){
        setCommunity([...(community.filter((comm)=> comm[e.target.name] !== e.target.id)), {[e.target.name]: "yesss"}])
        console.log(community)
      }
      else{
        setCommunity(community.filter(comm => comm != e.target.value))
      }
    }

    function saveUser(){
      createUser({
        variables:{
         ...profile, communities: community
        }
      })
     if(!createUserError && !createUserLoading){
      navigate("/")
     }
    }

    useEffect(()=>{
      const comms = []
      communities?.communities?.forEach((comm: { push: (arg0: { [x: number]: string }) => void; communityName: string })=>{
        comms.push({
          [comm.communityName as string]: ""
        })
      })
      setCommunity(comms)
    }, [communities])

    return(
      <div className='w-full flex flex-col gap-3'>
      <h1 className='self-start text-xl font-extrabold w-full border-b border-gray-300 py-3'>Select Communities {`${page}/2`}</h1>
       {!loading && !error && communities && communities.communities.length && communities.communities.map((comm: { map: React.Key; communityName: string, _id: string }, index: React.Key | number)=>{
        return(
          <div className='flex items-center' key={index}>
          <input type="checkbox" id={comm._id} onChange={handleCommunityChange} name={comm.communityName} value={((community.find((comms)=> comm._id == (comms as {_id: string})._id)) as {_id:string})?._id} checked={community?.includes(comm._id)} className='mr-2 w-4 h-4' />
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