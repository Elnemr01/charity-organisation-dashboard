import React from 'react'

const Card = ({ title, children, full = false }) => {
    return (
        <div className={`border rounded-md p-3 bg-gray-50 ${full ? 'col-span-full' : ''}`}>
            <h3 className="font-semibold text-lg text-secondary border-b pb-1 mb-2">{title}</h3>
            {children}
        </div>
    )
}

export default Card