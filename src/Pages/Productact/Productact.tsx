import React, {useState} from 'react'
import { BigForm } from '../../Components'
import { inputFields } from '../../interface'
import {useLocation} from 'react-router-dom'

    const error = {
        price: {
            required: {
                ltCharacters: 3
            },
            error1: 'trường này không được để trống',
            error2: 'số ký tự phải lớn hơn 3 ký tự'
        },
        nameProduct: {
            required: {
                ltCharacters: 2
            },
            error1: 'trường này không được để trống',
            error2: `số ký tự phải lớn hơn 2  ký tự`
        },
        unit: {
            required: {
                ltCharacters: 5

            },
            error1: 'trường này không được để trống',
            error2: `số ký tự phải lớn hơn 5  ký tự`
        },
    }

    
    const initValue = {
        price: '',
        nameProduct: '',
        unit: ''
    }

    const fieldsInput: inputFields[] = [
      {
          title: 'tên sản phẩm',
          type: 'text',
          placeholder: 'nhập',
          name: 'nameProduct'
      },
      {
          title: 'giá ',
          type: 'text',
          placeholder: 'nhập',
          name: 'price',
          pattern:"[0-9]+",
          onKeyPress: (event: any) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }
      },
      {
          title: 'bán theo',
          type: 'text',
          placeholder: 'nhập',
          name: 'unit'
      }
      
  ]

  const url = {
    create: 'product/',
    get: 'product/',
    update: 'product/'
  }


  const titleHeading = {
    create: 'tạo sản phẩm',
    edit: 'chỉnh sửa sản phẩm'
}

const Productact = () => { 

    const [formInput, setFormInput] = useState(initValue)



  const location = useLocation()
  const isCreate = location.pathname === '/createproduct'
  const nav = '/product'

  return (
    <div >
        <BigForm error={error} initValue={initValue} fieldsInput={fieldsInput} url={url} isCreate={isCreate}  titleHeading={titleHeading} nav={nav}/>
    </div>
  )
}

export default Productact