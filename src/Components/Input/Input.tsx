import React from 'react'
import './Input.scss'

interface Props {
    attribute: any
}

const Input:React.FC<Props> = (props) => {
  return (
        <input {...props.attribute}  />
  )
}

export default Input