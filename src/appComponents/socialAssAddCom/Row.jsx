import React from 'react'

const Row = ({ label, value }) => {
    return (
        <div className="flex items-start justify-between gap-3 text-md py-0.5">
            <span className="text-gray-500 shrink-0">{label}</span>
            <span className="font-medium text-left break-wor">{value}</span>
        </div>
    )
}

export default Row