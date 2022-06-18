import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.scss'
import {useStore} from '../../Hooks'

interface Feture {
  feture: string,
  icon: string, 
  route: string
}


const fetuture:Feture[] = [
  {
    feture: "sản phẩm",
    icon: "fa-brands fa-product-hunt",
    route: "/product"
  }, 
  {
    feture: "người dùng",
    icon: "fa-solid fa-user-plus",
    route: "/users"
  }, 
  {
    feture: "đăng nhập",
    icon: "fa-solid fa-arrow-right-to-bracket",
    route: "/login"
  }, 
  {
    feture: "đăng xuất",
    icon: "fa-solid fa-right-from-bracket",
    route: "/logout"
  }
]



const Sidebar = () => {
  const location = useLocation()

  const [state] = useStore()

  const activeItem = fetuture.findIndex((item) => item.route === location.pathname)

  const removeActive = () => {
    if(window.innerWidth <= 739) {
      const el =  document.querySelector<HTMLElement>('.sidebarContent') 
      el!.style!.transform = "translateX(-100%)" 
      document.querySelector<HTMLElement>('.sibartime i')!.className = 'fa-solid fa-bars' 
    }
 
  }

  return (
        <div className="col-l-3 sidebarContent ">
          <div className="sideBarTitle">
              <h2>Dashboard</h2>
          </div>
          {
            fetuture.map((item, index) => {
              return (
                  item.route === '/login' && state.user ? null 
                  : item.route === '/logout' && !state.user ? null : (
                    <Link to={item.route} className={`sidebarCart ${activeItem === index ? 'active' : ''}`} key={index} onClick={removeActive}>
                      <i className={item.icon}></i>
                      <span>{item.feture}</span>
                    </Link >
                  )

              )
            })
          }
        </div>
  )
}

export default Sidebar