import { assets } from '@/assets/assets'
import { User } from 'lucide-react'
import React from 'react'

const Header = ({headerText}) => {
    return (
        <header className='flex items-center justify-center p-4 shadow-sm shadow-primary fixed w-full  z-10 bg-tertiary'>
            <div className="container flex items-center justify-between">
                <h1 className='font-semibold text-2xl text-neutral'>
                    {headerText}
                </h1>
                <div className="rounded-md w-10 h-10">
                    <img src={assets.zadLogo} alt="zad logo" loading='lazy' className='w-full'/>
                </div>
            </div>
        </header>
    )
}

export default Header