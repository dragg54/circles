/* eslint-disable prefer-const */
import React, { ChangeEvent, useState } from 'react'
import { IPost, PostCommunity } from '../../types/IPost'
import { useMutation } from '@apollo/client'
import { CreatePostMutation } from '../../graphql/mutations/post'
import Form from './Form'
import CommunityModal from '../Modals/CommunityModal'
import SubmitButton from '../Buttons/SubmitButton'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, addPost } from '../../redux/Post'
import { AuthState } from '../../types/States'
import { isClosed } from '../../redux/GlobalModal'
import useTimedModal from '../../hooks/useTimedModal'
import GalleryInput from '../GalleryInput'
import { FormTypes } from '../../types/Form'


const PostForm = () => {
    type FormType = {
        formModal:{
            formName: FormTypes,
            parent: IPost
        }
    }
    const currentUser = useSelector(state => (state as AuthState).auth.user)
    const formModal = useSelector(state => state as FormType).formModal
    let [formObj, setFormObj] = useState<IPost>({
        _id: null,
        parentPostId:formModal?.parent?._id?.toString(),
        topic: "",
        body: "",
        comments: [''],
        image: null,
        community: "" as string,
        error: '',
        user: {
            userName: '',
            profilePic: ''
        },
        likedBy: [],
        createdBy: currentUser?.id,
        createdAt: Date.now(),
        dislikedBy: [],
        updatedAt: null,
        updatedBy: null,
    })
    interface PostType extends HTMLInputElement, IPost {

    }

    interface FileTarget extends EventTarget{
        files: FileList
    }

    const dispatch = useDispatch()
    const dispatchModal = useDispatch()
    function handleformChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        e.preventDefault()
        const { value, name } = e.target as PostType
        setFormObj({
            ...formObj, [name]: value
        })
    }

    function handleImageChange(e: ChangeEvent<HTMLInputElement>){
        e.preventDefault()
        const postImage = (e.target as FileTarget).files[0]
        setFormObj({...formObj, image: postImage})
    }
    const [createPostMutation, { error, loading }] = useMutation(CreatePostMutation)
    const toggleResponseModal = useTimedModal()

    const handleMutation = async () => {
        try {
            let { body, topic,community, image, parentPostId } = formObj
            if(formModal.formName == FormTypes.commentForm){
                parentPostId = formModal.parent._id.toString()
                community = (formModal.parent.community as PostCommunity)._id
                topic = formModal.parent.topic
            }
            const result = await createPostMutation({
                variables: {
                    parentPostId,
                    topic: topic,
                    body: body,
                    image: image,
                    community: community
                },
            });
            const newPost = result.data.createPost
            formObj.image = newPost.image
            newPost.user.profilePic = currentUser.profilePicture
            newPost.user.userName = currentUser.userName
            dispatchModal(isClosed({formName: FormTypes.createForm, parent: formModal.parent}))
            toggleResponseModal(`Post successfully sent`)
            if(formModal.formName == FormTypes.commentForm){
                console.log(formModal.parent.community)
                newPost.community = formModal.parent.community
                dispatch(addComment({comment: newPost}))
                setFormObj({
                    _id: null,
                    parentPostId:formModal?.parent?._id?.toString(),
                    topic: "",
                    body: "",
                    comments: [''],
                    image: null,
                    community: "" as string,
                    error: '',
                    user: {
                        userName: '',
                        profilePic: ''
                    },
                    likedBy: [],
                    createdBy: currentUser.id,
                    createdAt: Date.now(),
                    dislikedBy: [],
                    updatedAt: null,
                    updatedBy: null,
                })
            }
            else{
                dispatch(addPost({post: newPost}))
            }

        } catch (e:unknown) {
            toggleResponseModal((e as Error).message)
            console.error('Mutation error:', e);
        }
    }
    if (loading) return 'Loading...';
   if (error) return `Error: ${error.message}`;
    return (
        <Form>
            <h1 className='text-2xl w-full border-b border-gray-300 mb-2 pb-4 font-extrabold'>What's on your mind ?</h1>
            {formModal.formName == FormTypes.createForm && <CommunityModal communitySelectedHeading={'Select Community'} name="community" value={(formObj.community! as string)} handleformChange={handleformChange} />}
            {formModal.formName == FormTypes.createForm && <input type="text" placeholder='Title' name="topic" value={formObj.topic} onChange={handleformChange} />}
            <textarea cols={20} rows={10} placeholder={`${formModal.formName == FormTypes.createForm? "Post your thought...": "Post your comment..."}`} name='body' value={formObj.body} onChange={(e)=>handleformChange(e)} />
            <div>
                <GalleryInput {...{handleImageChange}}/>
            </div>
            <SubmitButton name={"Save"} handleSubmit={handleMutation} />
        </Form>
    )
}

export default PostForm