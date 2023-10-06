import React, { ReactElement } from 'react'
import { ButtonStyle } from '../../types/ButtonStyle'

const index = ({name, handleClick, style}: {name: string | ReactElement, style: ButtonStyle, handleClick:()=> void}) => {
  return (
   <button type='button' onClick={handleClick} style={{backgroundColor: style.background}} className={`px-6 flex justify-center py-3 text-sm rounded-md shadow-sm font-semibold text-white border border-gray-400 `}>{name}</button>
  )
}

export default index
