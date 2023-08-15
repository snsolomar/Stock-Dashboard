import React from 'react'

const SearchResults = ( {results} ) => {
  return (
    <ul className='absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll bg-white border-neutral-200'>
        {results.map((item) =>{
            // console.log('Key:', item["1. symbol"]); // Log the key
            return <li key={item["1. symbol"]} className='cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-emerald-200'>
                <span>{item["1. symbol"]}</span>
                <span>{item["2. name"]}</span>
            </li>
        })}
    </ul>
  )
}

export default SearchResults
