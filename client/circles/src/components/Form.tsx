// import React, { ChangeEvent, useState } from 'react'
// import { CommunityModal } from './Header'
// import SubmitButton from './Buttons/SubmitButton'
// import { useNavigate } from 'react-router-dom'
// import { useMutation } from '@apollo/client'
// import { LoginUser } from '../graphql/mutations/user'
// import Cookies from 'js-cookie'
// import { useLocalStorage } from '../hooks/useLocalStorage'
// import { IPost } from '../types/IPost'
// import { CreatePostMutation } from '../graphql/mutations/post'

// const Form = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <form className='w-full p-4 py-5 rounded-md flex flex-col bg-white gap-3 border border-gray-300 shadow-sm shadow-slate-300'>
//       {children}
//     </form>
//   )
// }


// //createpost form
// export const CreatePostForm = () => {
//   const [formObj, setFormObj] = useState<IPost>({
//     parentPostId: "", topic: "", body: "", communityName: ""
//   })
//   interface PostType extends   HTMLInputElement , IPost {
    
//   }
//   function handleformChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>){
//     e.preventDefault()
//     const {value, name} = e.target as PostType
//     setFormObj({
//       ...formObj, [name]: value
//     })
//   }

//   const [createPostMutation, {error, data}] = useMutation(CreatePostMutation)

//     const handleMutation = async() =>{
//       console.log(formObj)
//       try {
//         const {body, topic, communityName} = formObj
//         const result =  await createPostMutation({
//           variables: {
//             topic: topic,
//             body: body,
//             communityName: communityName
//           },
//         });
//         const response = result.data
//        console.log(response)
//       } catch (e) {
//         console.error('Mutation error:', e);
//         console.log("error", error)
//       }  }
//   return (
//     <Form>
//       <h1 className='text-2xl w-full border-b border-gray-300 mb-2 pb-4 font-extrabold'>What's on your mind ?</h1>
//       <CommunityModal communitySelectedHeading={'Select Community'} name="communityName" value={formObj.communityName!} handleformChange={handleformChange}/>
//       <input type="text" placeholder='Title' name="topic" value={formObj.topic} onChange={handleformChange}/>
//       <textarea cols={20} rows={10} placeholder='Body' name='body' value={formObj.body} onChange={handleformChange}/>
//       <SubmitButton name={"Save"} handleSubmit={handleMutation}/>
//     </Form>
//   )
// }

// //signup form
// export const SignupForm = ({page, setPage}) => {
//   return (
//     <Form>
//       {page==1?<Bio {...{page, setPage}}/> : <ChooseCommunity {...{page, setPage}}/>}
//     </Form>
//   )
// }
// const Bio = ({page, setPage}: {page:number, setPage: React.Dispatch<React.SetStateAction<number>>}) =>{
//   return(
//     <div className='w-full  flex flex-col gap-3'>
//     <h1 className='self-start text-xl font-extrabold w-full border-b border-gray-300 py-3'>Set Up Account {`${page}/2`}</h1>
//       <input type="text" placeholder='Username'/>
//       <input type="text" name="email" id="" placeholder='Email'/>
//       <input type="password" name="email" id="" placeholder='Password'/>
//       <textarea name="" id="" cols="20" rows="5" placeholder='Bio'></textarea>
//       <SubmitButton name="NEXT" handleSubmit={()=>setPage(2)}/> 
//     </div>
//   )
// }

// const ChooseCommunity = ({page, setPage}: {page:number, setPage: React.Dispatch<React.SetStateAction<number>>}) =>{
//   const navigate = useNavigate()
//   return(
//     <div className='w-full flex flex-col gap-3'>
//     <h1 className='self-start text-xl font-extrabold w-full border-b border-gray-300 py-3'>Select Communities {`${page}/2`}</h1>
//       <div className='flex items-center'>
//         <input type="checkbox" name="Music" value="Music" className='mr-2 w-4 h-4' />
//         <label htmlFor="Music">Music (23,000)</label>
//       </div>
//       <div className='flex items-center'>
//         <input type="checkbox" name="Tech" value="Tech" className='mr-2 w-4 h-4' />
//         <label htmlFor="Tech">Tech (24000)</label>
//       </div>
//       <div className='flex items-center'>
//         <input type="checkbox" name="Music" value="Music" className='mr-2 w-4 h-4' />
//         <label htmlFor="Music">Politics (25000)</label>
//       </div>
//       <div className='flex items-center'>
//         <input type="checkbox" name="Music" value="Music" className='mr-2 w-4 h-4' />
//         <label htmlFor="Music">Education (26000)</label>
//       </div>
//       <div className='flex items-center'>
//         <input type="checkbox" name="Music" value="Music" className='mr-2 w-4 h-4' />
//         <label htmlFor="Music">Movie (27000)</label>
//       </div>
//       <div className='flex items-center'>
//         <input type="checkbox" name="Music" value="Music" className='mr-2 w-4 h-4' />
//         <label htmlFor="Music">Sport (28000)</label>
//       </div>
//       <SubmitButton name={"SAVE"} handleSubmit={()=>navigate("/")}/>
//     </div>
//   )
// }

// export const SigninForm = () =>{
//   interface LoginType extends   HTMLInputElement {
//     email?: string,
//     password?: string
//   }
//   const [ loginUserMutation ] =  useMutation(LoginUser)
//   const [loginDetails, setLoginDetails ] = useState({email: "", password: ""})

//   function handleformChange(e: ChangeEvent<HTMLInputElement>){
//     e.preventDefault()
//     const {value, name} = e.target as LoginType
//     setLoginDetails({...loginDetails, [name]: value})
//   }
//   const handleMutation = async() =>{
//   try {
//     const result =  await loginUserMutation({
//       variables: {
//         email: loginDetails.email,
//         password: loginDetails.password
//       },
//     });
//     const response = result.data.loginUser
//    if(response && response.status == "OK"){
//     localStorage.setItem("auth", JSON.stringify(response.token))
//     navigate("/")
//    }
//   } catch (e) {
//     // Handle errors
//     console.error('Mutation error:', e);
//   }  }
//   const navigate = useNavigate()
//   return(
//    <Form>
//      <div className='w-full  flex flex-col gap-3'>
//   <h1 className='self-start text-4xl font-extrabold w-full border-b  border-gray-300 py-3'>Sign in</h1>
//     <input type="text" name="email" id="" placeholder='Email' onChange={handleformChange} value={loginDetails.email}/>
//     <input type="password" name="password" id="" placeholder='Password' value={loginDetails.password} onChange={handleformChange}/>
//     <SubmitButton name="LOGIN" handleSubmit={handleMutation}/> 
//   </div>
//    </Form>
//   )
// }

// export default Form