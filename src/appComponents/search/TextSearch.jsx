import { debounce } from 'lodash'
import { Search } from 'lucide-react'
import React, { useCallback } from 'react'

const TextSearch = ({setDebounceValue}) => {

    const debounceFun = useCallback(
        debounce((value) => setDebounceValue(value), 500)
    , []);

    return (
        <div className="search flex items-center gap-2 max-w-200 relative my-4">
            <Search size={15} className='absolute text-secondary start-2'/>
            <input
                type="text"
                onChange={(e) => debounceFun(e.target.value)}
                placeholder="بحث..."
                className="border border-secondary rounded-md outline-none p-2 w-full pr-8"
            />
        </div>
    )
}

export default TextSearch