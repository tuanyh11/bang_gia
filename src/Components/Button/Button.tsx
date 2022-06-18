import React, { CSSProperties } from 'react'
import {Link} from 'react-router-dom'
import './Button.scss'

interface Props {
  src?: string,
  onClick?: Function,
  to?: string,
  title?: string,
  type?: string | null,
  style?: CSSProperties
}

const Button:React.FC<Props> = (props) => {
  const {title, ...prop} = props
  let Tag:any = 'button'
  if(props.src && !props.to) Tag = 'a'
  else if(props.to) {
    Tag = Link
    props = {...props, type: null}
  }

  return (
    <div>
        <Tag className="button" {...prop} >{title}</Tag>
    </div>
  )
}

export default Button