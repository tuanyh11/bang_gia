import React from 'react'
import { BigForm } from '../../Components'
import { inputFields } from '../../interface'
import {useLocation} from 'react-router-dom'
import api from '../../axios'

const error = {
    nameUser: {
        required: {
            ltCharacters: 3
        },
        error1: 'trường này không được để trống',
        error2: 'số ký tự phải lớn hơn 3 ký tự'
    },
    phone: {
        required: {
            ltCharacters: 2,
            regex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/
        },
        error1: 'trường này không được để trống',
        error3: 'số điện thoại không hợp lệ'
    },
    passwords: {
        required: {
            ltCharacters: 5
        },
        error1: 'trường này không được để trống',
        error2: `số ký tự phải lớn hơn 5  ký tự`
    },
    comfirmPassword: {
        required: {
            ltCharacters: 5,
            isPassword: true
        },
        error1: 'trường này không được để trống',
        error2: `số ký tự phải lớn hơn 5  ký tự`,
        error3: 'mật khẩu xác nhận không hợp lệ'
    },
}


const initValue = {
    nameUser: '',
    passwords: '',
    phone: '',
    comfirmPassword: ''
}

const fieldsInput: inputFields[] = [
  {
      title: 'tên người dùng',
      type: 'text',
      placeholder: 'nhập',
      name: 'nameUser'
  },
  {
      title: 'phone ',
      type: 'text',
      placeholder: 'nhập',
      name: 'phone',
      pattern:"[0-9]+",
      onKeyPress: (event: any) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }
  },
  {
      title: 'password',
      type: 'text',
      placeholder: 'nhập',
      name: 'passwords',
      value: '',
  },

  {
    title: 'xác nhận lại mật khẩu',
    type: 'text',
    placeholder: 'nhập',
    name: 'comfirmPassword',
    value: '',
}
  
]

const url = {
    create: 'user/signup',
    get: 'user/',
    update: 'user/'
}

const titleHeading = {
    create: 'tạo người dùng',
    edit: 'chỉnh sửa người dùng'
}

const Usersact = () => {
    const location = useLocation()
    const isCreate = location.pathname === '/createuser'
    const nav = '/users'
  return (
    <div>
        <BigForm
         error={error} 
         initValue={initValue} 
         fieldsInput={fieldsInput} 
         url={url} 
         isCreate={isCreate} 
         titleHeading={titleHeading}
         nav={nav}
         />
    </div>
  )
}

export default Usersact