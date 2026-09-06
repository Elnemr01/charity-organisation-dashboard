import { User } from 'lucide-react'
import React from 'react'

const Header = ({headerText}) => {
    return (
        <div className='flex items-center justify-center p-4 '>
            <div className="container flex items-center justify-between">
                <h1 className='font-semibold text-2xl text-neutral'>
                    {headerText}
                </h1>
                <div className="bg-secondary text-tertiary rounded-full p-2">
                    <User size={17} className='text-tertiary'/>
                </div>
            </div>
        </div>
    )
}

export default Header