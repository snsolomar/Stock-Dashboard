import React from 'react'
import Search from './Search'

const Header = ({ name, ticker, onStockSelected }) => {
  return (
      <div className='xl:px-32'>
          <div className='flex justify-between items-center'>
              <h1 className='text-5xl'>{name}</h1>
              <h1 className='text-5xl pl-2'>({ticker})</h1>
          </div>
          <Search onStockSelected={onStockSelected} />
      </div>
  );
}

export default Header;


