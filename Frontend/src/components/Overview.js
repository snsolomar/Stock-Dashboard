import React, { useState } from 'react'
import Cards from './Cards'

const Overview = ({ symbol, price, change, changePercent, currency }) => {
  
  const isPositiveChange = parseFloat(change) > 0;

  return (
    <Cards>
        <span className='absolute left-4 top-4 text-neutral-500 text-lg xl:text-xl 2xl:text-2xl'>{symbol}</span>
        <div className='w-full h-full flex items-center justify-around pt-5'>
            <span className='text-2xl xl:text-4xl 2xl:text-2xl text-neutral-500 m-2'>
                {parseFloat(price).toFixed(2)}
                <span className='text-lg xl:text-xl 2xl:text-2xl text-neutral-500 m-2'>
                    {currency}
                </span>
            </span>
            <span className={isPositiveChange ? 'text-green-500' : 'text-red-500'}>
                {change}
                <span className={isPositiveChange ? 'text-green-500' : 'text-red-500'}>
                    ({changePercent})
                </span>
            </span>
            
            
        </div>
        
    </Cards>
  )
}

export default Overview
