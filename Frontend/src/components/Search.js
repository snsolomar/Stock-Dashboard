import React, { useState } from 'react'
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';

const Search = () => {
    const [input, setInput] = useState("")

    const clear = () => {
        setInput("");
        setSearchResults([]); 
    };

    
    const [searchResults, setSearchResults] = useState([]);

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
                    setSearchResults([event.target.value]);
                    console.log(searchResults);
                }
            }}
            />
            
            {input && (
                <button onClick={clear} className='m-1'>
                    <XMarkIcon className='h-4 w-4 fill-gray-500'/>
                </button>
            )}

            <button className='h-8 w-8 bg-emerald-700 rounded-md flex justify-center items-center m-1 p-2'>
                <MagnifyingGlassIcon className='h-4 w-4 fill-gray-100'/>
            </button>
        </div>
    )
}

export default Search
