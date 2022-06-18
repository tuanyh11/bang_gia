import React from 'react'
import {Outlet, Navigate, useLocation} from 'react-router-dom'

interface Props {
  to: string,
  children?: React.ReactNode
}

const RequireAuth:React.FC<Props> = ({to}) => {
  const user = JSON.parse(localStorage.getItem('user') as string)
  const location = useLocation()
  return (
    <div>
        {
            user ?
            <Outlet/> : 
            <Navigate to={to} replace state={{from: location}}/>
        }
        
    </div>
  )
}

export default RequireAuth