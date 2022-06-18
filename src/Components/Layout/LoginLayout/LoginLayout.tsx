import React from 'react'

interface Props {
    children: React.ReactNode
  }

const LoginLayout = ({children}: Props) => {
  return (
    <div className='loginLayout' >
        {children}
    </div>
  )
}

export default LoginLayout