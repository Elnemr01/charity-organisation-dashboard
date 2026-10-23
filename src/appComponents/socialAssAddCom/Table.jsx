import React from 'react'

const Table = ({ head, children }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
                <thead>
                    <tr className="bg-gray-100 text-gray-600">
                        {head.map((h) => (
                            <th key={h} className="px-2 py-1 font-medium whitespace-nowrap">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    )
}

export default Table