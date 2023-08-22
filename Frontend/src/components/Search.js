import React, { useState } from 'react'
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import SearchResults from './SearchResults';
import { mockSearchResults } from '../constants/mock';

const Search = ( {onStockSelected}) => {
    const [input, setInput] = useState("")
    const [bestMatches, setBestMatches] = useState([]);
    
    const handleSearch = () => {
        if (bestMatches && bestMatches.length > 0) {
            const selectedSymbol = bestMatches[0]["1. symbol"];  // Assume the first match is the best match.
            console.log('Selected symbol inside handleSearch:', selectedSymbol);
            onStockSelected(selectedSymbol);
        }
    }

    const clear = () => {
        setInput("");
        setBestMatches([]); 
    };
    

    return (
        <div className='flex items-center my-4 border-2 rounded-md relative z-50 w-96 bg-white border-neutral-200'>
            <input 
            type="text" 
            value={input} 
            className='w-full px-4 py-2 focus:outline-none rounded-md'
            placeholder='Seach Stock Symbol'
            onChange={(event) => {
                const inputValue = event.target.value;
                setInput(inputValue);
            
                fetch(`http://localhost:3001/searchResults/${inputValue}`)
                .then(response => response.json())
                .then(data => {
                    // Assuming the API's search results are in a property called bestMatches
                    setBestMatches(data.bestMatches || []);
                })
                .catch(error => {
                    console.error("Error fetching search results:", error);
                });
            }}
            
            onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    handleSearch();
                }
            }}
            />
            
            {input && (
                <button onClick={clear} className='m-1'>
                    <XMarkIcon className='h-4 w-4 fill-gray-500'/>
                </button>
            )}

            <button 
                onClick={handleSearch} 
                className='h-8 w-8 bg-emerald-700 rounded-md flex justify-center items-center m-1 p-2'>
                    <MagnifyingGlassIcon className='h-4 w-4 fill-gray-100'/>
            </button>

            {input && bestMatches.length > 0 ? (
                <SearchResults results={bestMatches} onStockSelected={onStockSelected} />
            ) : null}
        </div>
    )
}

export default Search