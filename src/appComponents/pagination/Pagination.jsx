import { Button } from '@/components/ui/button'
import React from 'react'

const Pagination = ({response,setPage}) => {
    return (
        (response?.hasPreviousPage || response?.hasNextPage) && (
            <div className="pagination flex items-center justify-between gap-2 mt-8">
                <Button className={` bg-neutral ${response?.hasNextPage ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`} 
                onClick={()=> setPage((prev)=> prev + 1)}>التالي
                </Button>
                <Button className={` bg-neutral ${response?.hasPreviousPage ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                onClick={()=> setPage((prev)=> prev - 1)}>السابق
                </Button>
            </div>
        )
    )
}

export default Pagination

