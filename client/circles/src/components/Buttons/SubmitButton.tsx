import React from 'react'
import Button from './index'

export const SubmitButton = ({name, handleSubmit}: {name: string, handleSubmit:()=> void}) => {

    return (
    <Button name={name} handleClick={handleSubmit} style={{background:"#130329", textColor: "black"}}/>
  )
}

export default SubmitButton