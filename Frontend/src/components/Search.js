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

    const updateBestMatches = () => {
        setBestMatches(mockSearchResults.result);

    }
    

    return (
        <div className='flex item-center my-4 border-2 rounded-md relative z-50 w-96 bg-white border-neutral-200'>
            <input 
            type="text" 
            value={input} 
            className='w-full px-4 py-2 focus:outline-none rounded-md'
            placeholder='Seach Stock Symbol'
            onChange={(event) => {
                setInput(event.target.value);
                console.log(event.target.value)
            }}
            onKeyPress={(event) => {
                if (event.key === 'Enter'){
                    setBestMatches([event.target.value]);
                    console.log(bestMatches);
                }
            }}
            />
            
            {input && (
                <button onClick={clear} className='m-1'>
                    <XMarkIcon className='h-4 w-4 fill-gray-500'/>
                </button>
            )}

            <button 
            onClick={updateBestMatches} 
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
