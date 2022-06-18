import React, {useState} from 'react'
import './Header.scss'

const Header = () => {

  const [isActive, setIsActive ] = useState(false)

  const toggleNav = (e: any) => {
    const el = document.querySelector<HTMLElement>('.sidebarContent')
    if(e.target.classList.contains('fa-bars')) {
      el!.style!.transform = 'translateX(0)'
      e.target.className = 'fa-solid fa-xmark' 
      
    } else {
      el!.style!.transform =  'translateX(-100%)'
      e.target.className = 'fa-solid fa-bars' 
    }
    setIsActive(!isActive)
  }
  

  return (
    <div className="header">
        <div className="sibartime" onClick={toggleNav}>
          <i className={'fa-solid fa-bars'}></i>
        </div>
    </div>
  )
}

export default Header