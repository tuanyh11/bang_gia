import React, { CSSProperties } from 'react'
import './Form.scss'

interface Props {
    children?: any,
    action?: string,
    style?: CSSProperties,
    onSubmit?: (event: any) => void
}

const Form: React.FC<Props> = ({children, ...prpos}) => {
  return (
    <form {...prpos}>
        {children && children} 
    </form>
  )
}

export default Form