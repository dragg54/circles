import React, { ChangeEvent, useState } from 'react'
import { IPost } from '../../types/IPost'
import { useMutation } from '@apollo/client'
import { CreatePostMutation } from '../../graphql/mutations/post'
import Form from './Form'
import CommunityModal from '../Modals/CommunityModal'
import SubmitButton from '../Buttons/SubmitButton'

type NewPost = Omit<IPost, 'createdBy'| 'createdAt'| 'updatedAt'| 'updatedBy' | 'likedBy' | 'dislikedBy'>

const PostForm = () => {
    const [formObj, setFormObj] = useState<NewPost>({
        postId: "",
        parentPostId: "",
        topic: "",
        body: "",
        communityName: "",
        error: '',
    })
    interface PostType extends HTMLInputElement, IPost {

    }
    function handleformChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        e.preventDefault()
        const { value, name } = e.target as PostType
        setFormObj({
            ...formObj, [name]: value
        })
    }

    const [createPostMutation, { error, data }] = useMutation(CreatePostMutation)

    const handleMutation = async () => {
        console.log(formObj)
        try {
            const { body, topic, communityName } = formObj
            const result = await createPostMutation({
                variables: {
                    topic: topic,
                    body: body,
                    communityName: communityName
                },
            });
            const response = result.data
            console.log(response)
        } catch (e) {
            console.error('Mutation error:', e);
            console.log("error", error)
        }
    }
    return (
        <Form>
            <h1 className='text-2xl w-full border-b border-gray-300 mb-2 pb-4 font-extrabold'>What's on your mind ?</h1>
            <CommunityModal communitySelectedHeading={'Select Community'} name="communityName" value={formObj.communityName!} handleformChange={handleformChange} />
            <input type="text" placeholder='Title' name="topic" value={formObj.topic} onChange={handleformChange} />
            <textarea cols={20} rows={10} placeholder='Body' name='body' value={formObj.body} onChange={handleformChange} />
            <SubmitButton name={"Save"} handleSubmit={handleMutation} />
        </Form>
    )
}

export default PostForm