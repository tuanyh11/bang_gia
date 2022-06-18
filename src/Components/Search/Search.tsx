import React, { useState, useEffect, EffectCallback } from 'react'
import './Search.scss'

interface Props {
    url?: string,
    handleSubmit?: (e: any) => void,
    propsButton?: any,
    stateTextSearch: [string, React.Dispatch<React.SetStateAction<string>>] ,
    handleSearch?: () => any,
}

const Search:React.FC<Props> = ({ propsButton, handleSubmit, stateTextSearch, handleSearch = () => {}}) => {
  const [textSearch, setTextSearch] = stateTextSearch
  useEffect(handleSearch, [textSearch])
  return (
    <div className="search ">
        <form className="" action="" onSubmit={handleSubmit}>
            <input type="text" placeholder='tìm kiếm tại đây...' value={textSearch} onChange={(e) => setTextSearch(e.target.value)}/>
            <button className="searchButton fa-solid fa-magnifying-glass"  type="submit" {...propsButton} ></button>
        </form >
    </div>
  )
}

export default Search