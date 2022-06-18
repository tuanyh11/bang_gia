import React, {useState, useEffect, useRef, MouseEventHandler} from 'react'
import {Cart, Search} from '../../Components/'
import { Product, User } from '../../interface'
import {Link} from 'react-router-dom'
import {Button, ComfirmButton} from '../../Components'
import axios from 'axios'
import api from '../../axios'

const Users = () => {
    const cartTitle = [
        {
          nameTitle: 'Tên Người dùng',
          tagTitle: 'h1'
        },
        {
          nameTitle: 'phone number',
          tagTitle: 'h2'
        },
        {
          nameTitle: 'Ngày tạo',
          tagTitle: 'span'
        }
      ]
    
      const toggleRefs = useRef<HTMLElement[]>([]) 
      const contentRefs = useRef<HTMLElement[]>([])
      const fristUser = useRef<User[]>([])
    
      const clickOutside = (event1: any, index: number) => {
        contentRefs.current[index]?.classList.toggle('active')
        document.addEventListener('mousedown', (event2: any) => {
          if(!contentRefs.current[index].contains(event2.target)) contentRefs.current[index]?.classList.remove('active')
        })
      }  
  
    
      const addToRef = (el: any, refs: any) => {
        if(el && !refs.current.includes(el)) {
          refs.current.push(el)
        }
    
      }

      // users actions
      const [users, setUsers] = useState<User[]>([])

      const [deleteComp, setDeleteComp] = useState<any>()
      
      const handleDeleteUser = async(id: string) => {
        try {
          const {data} =  await api.delete(`/user/${id}`)
          if(data.success) {
            setUsers(users.filter((user:User) => user.id !== id))
          }
        } catch (error) {
          console.log(error)
        }
      }
      
      const handleNo = () => {
        setDeleteComp(undefined)
      }
    
      useEffect(() => {
        api.get('/user/')
        .then(res => {
          setUsers(res.data.data)
          fristUser.current = res.data.data
        })
        .catch(err => console.log(err))
        return () => {
          document.removeEventListener('mousedown', () => null)
        }
      },[])

      const renderComfirm = (user: any) => {
        return (
          <div className="overlay">
            <ComfirmButton handleYes={ () => handleDeleteUser(user.id) } handleNo={handleNo}/>
          </div>
        )
      }

    
      const renderChildren = (user: any, index: number) => {
        const keys = ['nameUser', 'phone',  'createdAt'] 
        return (
          <div className="cart " key={index}>
    
            <div className="action">
              <i 
                onClick={(e) => clickOutside(e, index)}
                ref={(el:any ) => addToRef(el, toggleRefs)}
                id="toggleBt"
                className="fa-solid fa-ellipsis">
              </i>
              <div  ref={(el: any ) => addToRef(el, contentRefs)} className="boxAction">
                  <Link to={`/updateuser/${user.id}`}><button>Update</button></Link>
                  <Link to="/users"><button onClick={() => setDeleteComp(renderComfirm(user))}>Delete</button></Link>
              </div>
            </div>
    
            {cartTitle.map((item, index) => {
                const Tag = item.tagTitle as 'h1' | 'h2' | 'span'
                const key = keys[index] as 'nameUser' | 'phone' | 'createdAt'
                return(
                  <div className="cartTitle" key={index}>
                      <span>{item.nameTitle + ':'}</span>
                      <Tag>{user[key]}</Tag>
                  </div>
                )
              }
            )}
          </div>
        )
      }

            // search product
            const textSearch = useState('') 

            const handleSubmit = (e: React.FormEvent) => {
              e.preventDefault()
            }
      
            const handleSearch = () => {
                if(textSearch?.[0]) {
                  setUsers(
                    fristUser.current.filter(
                      item => item.nameUser.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(
                        textSearch?.[0].normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                        )
                      )
                  )
                } else {
                  setUsers(fristUser.current)
                }
            }
    
      return (
        <div>
            <div className="headingPage">
              <h2>UsersPage</h2>
              <Button to="/createuser" title='Thêm người dùng'/>
            </div>
            {
              users.length > 0 ? (
                <>
   
                  <div className="midlePage">
                      <Search handleSubmit={handleSubmit} stateTextSearch={textSearch} handleSearch={handleSearch}/>
                  </div>
                  <div className="productCartList">
                      <Cart
                          renderChildren={renderChildren}
                          data={users}
                      />
                  </div>
                  {
                    deleteComp && (
                      deleteComp
                    )
                  }
                </>
              ):
              (
                <div className='ringContainer'>
                  <div className="ring">

                  </div>
                </div>
              )
            }

        </div>
      )
}

export default Users