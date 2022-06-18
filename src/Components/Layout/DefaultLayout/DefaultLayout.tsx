import React from 'react'
import {Footer, Header, Sidebar} from '../../'

interface Props {
  children: React.ReactNode
}

const DefaultLayout:React.FC<Props> = ({children}) => {
  return (
    <div className='defaultLayout container'> 
      <div className="rowGrid">
          <Sidebar/>
        <div className="content  col-l-9  col-12">
          <Header/>
          <div className="contentRight ">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout