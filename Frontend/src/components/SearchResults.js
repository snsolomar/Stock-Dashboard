import React from 'react'
import '../components/StockTools.css'

const SearchResults = ({ results, onStockSelected }) => {
  return (
      <ul className="stock-list">
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

