import React from 'react'

const SearchResults = ({ results, onStockSelected }) => {
  return (
      <ul className='absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll bg-white border-neutral-200'>
          {results.map((item) => {
              return (
                  <li 
                      key={item["1. symbol"]} 
                      className='cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-emerald-200'
                      onClick={() => onStockSelected(item["1. symbol"])}
                  >
                      <span>{item["1. symbol"]}</span>
                      <span>{item["2. name"].substring(0, 25)}</span>
                  </li>
              );
          })}
      </ul>
  );
}

export default SearchResults;

