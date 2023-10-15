import React, { ChangeEvent, useEffect, useState } from 'react'
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
import { AiOutlineCheck } from 'react-icons/ai'
import { closeResponseModal, openResponseModal } from '../../redux/ResponseModal'
import useTimedModal from '../../hooks/useTimedModal'


const PostForm = () => {
    const currentUser = useSelector(state => (state as AuthState).auth)
    const [formObj, setFormObj] = useState<IPost>({
        _id: null,
        parentPostId: "",
        topic: "",
        body: "",
        community: "" as string,
        error: '',
        userName: currentUser.userName,
        likedBy: [],
        createdBy: currentUser.id,
        createdAt: Date.now(),
        dislikedBy: [],
        updatedAt: null,
        updatedBy: null,
    })
    interface PostType extends HTMLInputElement, IPost {

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
    const [createPostMutation, { error, data }] = useMutation(CreatePostMutation)
    const toggleResponseModal = useTimedModal()

    const handleMutation = async () => {
        console.log(formObj)
        try {
            const { body, topic, community } = formObj
            const result = await createPostMutation({
                variables: {
                    topic: topic,
                    body: body,
                    community: community
                },
            });
            const response = result.data
            dispatch(addPost({post: formObj}))
            dispatchModal(isClosed({formName:''}))
            toggleResponseModal(`Post successfully sent`)

        } catch (e:unknown) {
            toggleResponseModal(e.msg)
            console.error('Mutation error:', e);
        }
    }
    return (
        <Form>
            <h1 className='text-2xl w-full border-b border-gray-300 mb-2 pb-4 font-extrabold'>What's on your mind ?</h1>
            <CommunityModal communitySelectedHeading={'Select Community'} name="communityName" value={formObj.community!} handleformChange={handleformChange} />
            <input type="text" placeholder='Title' name="topic" value={formObj.topic} onChange={handleformChange} />
            <textarea cols={20} rows={10} placeholder='Body' name='body' value={formObj.body} onChange={handleformChange} />
            <SubmitButton name={"Save"} handleSubmit={handleMutation} />
        </Form>
    )
}

export default PostForm