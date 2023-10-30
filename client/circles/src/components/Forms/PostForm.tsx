import React, { ChangeEvent, useState } from 'react'
import { IPost } from '../../types/IPost'
import { useMutation } from '@apollo/client'
import { CreatePostMutation } from '../../graphql/mutations/post'
import Form from './Form'
import CommunityModal from '../Modals/CommunityModal'
import SubmitButton from '../Buttons/SubmitButton'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../../redux/Post'
import { AuthState } from '../../types/States'
import { isClosed } from '../../redux/GlobalModal'
import useTimedModal from '../../hooks/useTimedModal'
import GalleryInput from '../GalleryInput'


const PostForm = () => {
    const currentUser = useSelector(state => (state as AuthState).auth)
    const [formObj, setFormObj] = useState<IPost>({
        _id: null,
        parentPostId: "",
        topic: "",
        body: "",
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
            const { body, topic, community, image } = formObj
            const result = await createPostMutation({
                variables: {
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
            dispatch(addPost({post: newPost}))
            dispatchModal(isClosed({formName:''}))
            toggleResponseModal(`Post successfully sent`)

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
            <CommunityModal communitySelectedHeading={'Select Community'} name="community" value={(formObj.community! as string)} handleformChange={handleformChange} />
            <input type="text" placeholder='Title' name="topic" value={formObj.topic} onChange={handleformChange} />
            <textarea cols={20} rows={10} placeholder='Body' name='body' value={formObj.body} onChange={handleformChange} />
            <div>
                <GalleryInput {...{handleImageChange}}/>
            </div>
            <SubmitButton name={"Save"} handleSubmit={handleMutation} />
        </Form>
    )
}

export default PostForm