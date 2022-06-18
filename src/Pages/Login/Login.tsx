import React, { useEffect, useState } from 'react'
import {BigForm, Input} from '../../Components/'
import api from '../../axios'
import { useNavigate, useLocation } from 'react-router-dom'
import {useStore} from '../../Hooks'
import {actions} from '../../store'

const inputFields = [
    {
        title: 'phone',
        placeholder: 'nhập số điện thoại...', 
        type: 'text',
        name: 'phone'
        // errorMessage: 'trường này không được để trống'
    },
    {
        title: 'password',
        placeholder: 'nhập mật khẩu...', 
        type: 'password',
        name: 'password',
    }
]

const initValue = {
    phone: '',
    password: ''
}

interface LoginValue {
    [key: string]: string
}

const Login = () => {

    const navigation = useNavigate()
    const location: any = useLocation()
    const from = location.state?.from?.pathname === '/logout' ?  "/product" : location.state?.from?.pathname

    const [formValue, setFormValue] = useState<LoginValue>(initValue)
    const [errorMessage, setErrorMessage] = useState<LoginValue>({})
    const [isSubmit, setIsSubmit] = useState(false)

    const [state, dispatch] = useStore()

    const validate = (formValue: any ) => {
        const error: LoginValue = {}
        const regexs = {
            phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
        }
        if(!formValue.phone) {
            error.phone = 'yêu cầu số điện thoại'
        } else if(!regexs.phone?.test(formValue.phone)) {
            error.phone = 'số điện thoại không phù hợp'
        }

        if(!formValue.password) {
            error.password = 'yêu cầu mat khau'
            
        } else if(formValue.password.length <= 5) {
            error.password = 'trường này phải lớn hơn 5 ký tự'
        }
        return error
    }

    const handleSubmit = (e: React.FormEvent) =>  {
        e.preventDefault()
        setErrorMessage(validate(formValue))
        setIsSubmit(true)
    }
    const signin = async (formValue: LoginValue) => {
        try {
            const res = await api.post(`user/signin`, formValue)
            localStorage.setItem('user', JSON.stringify(res?.data?.data))
            dispatch(actions?.setUser(res?.data?.data))
            if(res.data.success) {
                navigation(from)
            }
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }


    useEffect(() => {
        if(isSubmit && Object.keys(errorMessage).length === 0) {
            signin(formValue)
        }
        setIsSubmit(false)
    }, [isSubmit])

    const handleSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue({...formValue, [e.target.name]: e.target.value})
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setErrorMessage({...errorMessage, [e.target.name]: ''})
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setErrorMessage({...errorMessage, [e.target.name]: validate(formValue)?.[e.target.name] ? validate(formValue)?.[e.target.name]: ''})
    }

  return (
    <div className=" login search">
        <form action="" onSubmit={handleSubmit}>
            {inputFields.map((item, index) => {
                const {title, ...newItem} = item
                return (
                <div className="group" key={index}>
                    <span>{title}</span>
                    <Input 
                        attribute={
                            {
                                ...newItem,
                                onChange: handleSetValue,
                                value: formValue[item.name as keyof typeof formValue],
                                onFocus: handleFocus,
                                onBlur: handleBlur,
                                className: errorMessage?.[item.name] ? 'errorInput' : ''
                            }
                        }
                    />
                    <p className="error">{errorMessage?.[item.name] && errorMessage[item.name]}</p>
                </div>
                )
            })}
            <div className="wrapButton">
                <button className="button" type='submit'>login</button>
            </div>
        </form>
    </div>
  )
}

export default Login