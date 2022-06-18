import React from 'react'
import Button from '../Button/Button'
import './ComfirmButton.scss'

interface Props {
  title?: string;
  handleYes?: () => any,
  handleNo?: () => any
}

const ComfirmButton:React.FC<Props> = ({title, handleYes, handleNo}) => {
  return (
    <div className="comfirmButton">
        <div className="comfirmContent">
          <h2>{title ? title : 'Bạn có chắc muốn xóa'}</h2>
          <div className="comfirmBox">
            <Button title='Yes' onClick={handleYes}></Button>
            <Button title='No' onClick={handleNo}></Button>
          </div>
        </div>
    </div>
  )
}

export default ComfirmButton