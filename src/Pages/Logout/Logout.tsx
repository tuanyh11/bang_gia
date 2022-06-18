import React from 'react'
import {ComfirmButton} from '../../Components/'
import {useStore} from '../../Hooks'
import {actions} from '../../store'
import {useNavigate} from 'react-router-dom'

const Logout = () => {
   const [state, dispatch] = useStore()

   const navigation = useNavigate()

   const handleYes = () => {
      dispatch(actions.logoutUser(localStorage.clear()))
   }

   const handleNo = () => {
    navigation('/product')
   }

  return (
    <div className="overlay">
        <ComfirmButton title='Đăng xuất ngay' handleYes={handleYes} handleNo={handleNo} />
    </div>
  )
}

export default Logout