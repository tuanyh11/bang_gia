import React, {useEffect, useRef, useState} from 'react'
import {Input, Form, Button} from '..'
import { useNavigate, useParams} from 'react-router-dom'
import { PropsBigForm, InitValueProduct, InitValueUser } from '../../interface'
import axios, {AxiosError} from 'axios'
import api from '../../axios'





const BigForm:React.FC<PropsBigForm> = ({initValue, fieldsInput, url, isCreate = true, error, titleHeading, nav}:PropsBigForm ) => {

    const navigation = useNavigate()

    const {id: idPr} = useParams()

    const [formInput, setFormInput] = useState(initValue)
    const [errorForm, setErrorForm] = useState({} as InitValueProduct | InitValueUser)
    const [errorServer, setErrorServer] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)


    useEffect(() => {

        (async () => {
            try {
                if(!isCreate) {
                    const {data} = await api.get(`${url.get}${idPr}`)
                    const {id, createdAt, updatedAt ,...newData} = data.data
                    if(data.data) setFormInput({...newData})
                }
            } catch (error: any) {
                setErrorServer(error?.response?.data?.message)
            }
        })()

    }, [idPr, url.get, isCreate])
                    


    const handleOnchange = (e:React.ChangeEvent<HTMLInputElement>) => {                    
        setFormInput({
            ...formInput, [e.target.name]:  e.target.value}
        )

    }
    const messageError = {} as InitValueProduct | InitValueUser 

    const validate = (fieldsInput: any) => {
        if(!formInput[fieldsInput ]) {
            messageError[fieldsInput ] = error[fieldsInput ]?.error1

        } else {
            if(formInput[fieldsInput ]?.length < error[fieldsInput ].required.ltCharacters) {
                messageError[fieldsInput ] = error[fieldsInput ].error2

            }
            if(error[fieldsInput ].required.regex && !error[fieldsInput].required.regex.test(formInput[fieldsInput ])) {
                messageError[fieldsInput ] = error[fieldsInput ].error3

            }

            if(error[fieldsInput ].required.isPassword && formInput['passwords'] !== formInput[fieldsInput] ) {
                messageError[fieldsInput ] = error[fieldsInput ].error3
            }
        }
        return messageError
    }



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        for (const key in formInput) {
            setErrorForm(validate(key))
        }
        setIsSubmit(true)
    }

    useEffect(() => {
        console.log(Object.keys(errorForm))
        if(Object.keys(errorForm).length === 0 && isSubmit) {
            if(isCreate) {
                (async () => {
                    try {
                        const {data} = await api.post(`${url.create}`, formInput)
                        if(data.data) {
                            navigation(nav);
                        }
                    } catch (error: any) {
                        setErrorServer(error?.response?.data?.message)
                    } 
                })()
            } else {
                if(!isCreate && Object.keys(formInput).length > 0) {
                    (async () => {
                        try {
                            const {data} = await api.patch(`${url.update}${idPr}`, formInput)
                            if(data.success) {
                                navigation(nav);
                            }
                        } catch (error: any) {
                            // setErrorServer(error?.response?.data?.message)
                        } 
                    })()
                }
            }
        }

        setIsSubmit(false)

    }, [isSubmit])

    const handleBlur = (e : React.FocusEvent<HTMLInputElement >) => {
        setErrorForm({...errorForm, [e.target.name]: validate(e.target.name)?.[e.target.name]})
    }


    const handleFocus = (e: React.FocusEvent<HTMLInputElement >) => {
        setErrorForm({...errorForm, [e.target.name]: ''})
    }


  return (
    <div className="productact ">

        <div className="search col-12" >
            <div className="headingPage">
                    <h2>{isCreate ? titleHeading.create: titleHeading.edit}</h2>
            </div>
            <Form action="" onSubmit={handleSubmit}>
            {
                fieldsInput.map((item, index) => (
                    <div key={index} className="group">
                        <span>
                            {item.title}
                        </span>
                        <Input 
                            attribute={
                                        {...item, 
                                        value: formInput[item.name] ? formInput[item.name] : ''  ,
                                        onChange: handleOnchange, 
                                        onBlur: handleBlur, 
                                        onFocus: handleFocus
                                        }
                                      }
                        />
                        {Object.keys(errorForm).length > 0 ? <p className="error">{errorForm[item.name]}</p>: null}
                    </div>
                ))
            }
            <Button title={isCreate ? 'Creating': 'Editing'} type="submit" style={{"position": "unset"}}/>
                {errorServer ? <p className="error">{errorServer}</p> : null}
            </Form>
        </div>
    </div>
  )
}

export default BigForm