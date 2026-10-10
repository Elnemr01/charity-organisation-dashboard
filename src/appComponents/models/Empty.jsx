import React from 'react'

const Empty = ({text}) => {
    return (
        <div className='flex items-center justify-center h-50'>
            <h3 className='text-neutral text-base'>{text ? text : ' لا توجد بيانات لعرضها '}</h3>
        </div>
    )
}

export default Empty