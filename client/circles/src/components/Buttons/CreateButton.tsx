import React from 'react'
import Button from './index'
import { useDispatch } from 'react-redux'
import { isOpened } from '../../redux/GlobalModal'
import { BiPlus } from 'react-icons/bi'
import { FormTypes } from '../../types/Form'

const CreateButton = () => {
    const dispatch = useDispatch()
    function createPost(){
        dispatch(isOpened({formName: FormTypes.createForm, parent: null}))
    }
  return (
    <Button name={<span className='flex gap-4 items-center'><BiPlus className="font-bold text-lg w-5 -ml-1 h-5"/> CREATE</span>} handleClick={createPost} style={{background:"#2B7C85", textColor: ""}}/>
  )
}

export default CreateButton