import React, { useState } from 'react'
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import SearchResults from './SearchResults';
import { mockSearchResults } from '../constants/mock';

const Search = () => {
    const [input, setInput] = useState("")
    const [bestMatches, setBestMatches] = useState([]);


    const clear = () => {
        setInput("");
        setBestMatches([]); 
    };
    

    return (
        <div className='flex item-center my-4 border-2 rounded-md relative z-50 w-96 bg-white border-neutral-200'>
            <input 
            type="text" 
            value={input} 
            className='w-full px-4 py-2 focus:outline-none rounded-md'
            placeholder='Seach Stock Symbol'
            onChange={(event) => {
                setInput(event.target.value);
                if (input) {
                    const matchingResults = mockSearchResults.bestMatches.filter(
                        item => item["1. symbol"].toLowerCase().startsWith(input.toLowerCase())
                    );
                    setBestMatches(matchingResults);
                } else {
                    setBestMatches([]); 
                }
            }}
            onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    // search bestMatch
                }
            }}
            />
            
            {input && (
                <button onClick={clear} className='m-1'>
                    <XMarkIcon className='h-4 w-4 fill-gray-500'/>
                </button>
            )}

            <button 
            // onClick={search the best match} 
            className='h-8 w-8 bg-emerald-700 rounded-md flex justify-center items-center m-1 p-2'>
                <MagnifyingGlassIcon className='h-4 w-4 fill-gray-100'/>
            </button>

            {input && bestMatches.length > 0 ? (
                <SearchResults results={bestMatches}/>
            ) : null}
        </div>
    )
}

export default Search
