import React from 'react'

const Section = ({ title, children }) => {
    return (
        <section className="border rounded-lg p-5 bg-gray-50 space-y-5">
            <h3 className="text-lg font-semibold border-b pb-3">{title}</h3>
            {children}
        </section>
    )
}

export default Section