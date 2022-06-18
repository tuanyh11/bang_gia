import React, { FC } from 'react'
import {Product, User} from '../../interface'
import './Cart.scss'
 
interface Props {
    renderChildren: (item: Product | User, index:number) => JSX.Element,
    data: Product[] | User[],
}

const Cart:React.FC<Props> = ({renderChildren, data}) => {
  return (
    <div className="container">
       <div className="row">
        {
              data.length > 0 ? (
                  data.map(renderChildren)
              ): null
          }
       </div>
    </div>
  )
}

export default Cart