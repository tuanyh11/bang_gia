import React, {useState, useEffect, useRef} from 'react'
import {useStore} from '../../Hooks'
import {Cart} from '../../Components/'
import { Product } from '../../interface'
import {Link} from 'react-router-dom'
import {Button, ComfirmButton } from '../../Components'
import {Search} from '../../Components/'
import api from '../../axios'

const Products = () => {
    const [{user}, dispatch] = useStore()

    const cartTitle = [
        {
          nameTitle: 'Tên sản phẩm',
          tagTitle: 'h1'
        },
        {
          nameTitle: 'Giá sản phẩm',
          tagTitle: 'h2'
        },
        {
          nameTitle: 'Bán theo',
          tagTitle: 'h2'
        },
        {
          nameTitle: 'Ngày tạo',
          tagTitle: 'span'
        }
      ]
    
      const toggleRefs = useRef<HTMLElement[]>([]) 
      const contentRefs = useRef<HTMLElement[]>([])
      const fristProduct = useRef<Product[]>([])

      
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
    
      
      const [product, setProduct] = useState<Product[]>([])
      
      const [deleteComp, setDeleteComp] = useState<any>()


      // product actions
      const handleDeleteProduct = async(id: string) => {
        try {
          const {data} =  await api.delete(`product/${id}`)
          if(data.success) {
            setProduct(product.filter((user:any) => user.id !== id))
            setDeleteComp(undefined)
          }
        } catch (error: any) {
          alert(error?.response?.data.message)
        }
      }

      const handleNo = () => {
        setDeleteComp(undefined)
      }

      useEffect(() => {
        api.get('/product/')
        .then(res => {
                      setProduct(res.data.data)
                      fristProduct.current = res.data.data
                    })
        .catch(err => alert(err))
        return () => {
          document.removeEventListener('mousedown', () => null)
        }
      },[])
      
      const renderComfirm = (product: Product) => {
        return (
          <div className="overlay">
            <ComfirmButton handleYes={ () => handleDeleteProduct(product.id)} handleNo={handleNo}/>
          </div>
        )
      }

      const renderChildren = (product: Product, index: number) => {
        const keys = ['nameProduct', 'price', 'unit', 'createdAt'] 
        return (
          <div className="cart " key={index}>
    
            {user && (
                  <div className="action">
                    <i 
                      onClick={(e) => clickOutside(e, index)}
                      ref={(el:any ) => addToRef(el, toggleRefs)}
                      id="toggleBt"
                      className="fa-solid fa-ellipsis">
                    </i>
                    <div  
                      ref={(el: any ) => addToRef(el, contentRefs)} className="boxAction">
                      <Link to={`/updateproduct/${product.id}`}><button>Update</button></Link>
                      <Link to="/product"><button onClick={ () => setDeleteComp(renderComfirm(product))}>Delete</button></Link>
                  </div>
                </div>
            )}
    
            {cartTitle.map((item, index) => {
                const Tag = item.tagTitle as 'h1' | 'h2' | 'span'
                const key = keys[index] as 'nameProduct' | 'price' | 'unit' | 'createdAt'
                return(
                  <div className="cartTitle" key={index}>
                      <span>{item.nameTitle + ':'}</span>
                      <Tag>{product[key]}</Tag>
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
            setProduct(
              fristProduct.current.filter(
                (item, index) => item.nameProduct.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(
                  textSearch?.[0].normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                  )
                )
            )
          } else {
            setProduct(fristProduct.current)
          }
      }

    
      return (
        <div>
            <div className="headingPage">
              <h2>sản phẩm</h2>
              <Button to="/createproduct" title='Thêm sản phẩm'/>
            </div>
            {
              product.length > 0 ? (
                <>

                <div className="midlePage">
                    <Search handleSubmit={handleSubmit} stateTextSearch={textSearch} handleSearch={handleSearch}/>
                </div>
                <div className="productCartList">
                    <Cart
                        renderChildren={renderChildren}
                        data={product}
                    />
                </div>
                {
                  deleteComp && (
                    deleteComp
                  )
                }
                </>
              ): 
              <div className='ringContainer'>
                <div className="ring">

                </div>
              </div>
            }

        </div>
      )
}

export default Products