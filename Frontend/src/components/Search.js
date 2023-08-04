import React, { useState } from 'react'

const Search = () => {
    const [input, setInput] = useState("")

    const clear = () => {
        setInput(""); 
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
            }}
            onKeyPress={(event) => {
                if (event.key === 'Enter'){
                    setInput();
                }
            }}
            />
        </div>
    )
}

export default Search
