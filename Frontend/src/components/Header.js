import React from 'react'
import Search from './Search'

const Header = ( {name, onStockSelected} ) => {
  return (
    <>
        <div className='xl:px-32'>
            <h1 className='text-5xl'>{name}</h1>
            <Search onStockSelected={onStockSelected} ></Search>
        </div>
    </>
  )
}

export default Header
