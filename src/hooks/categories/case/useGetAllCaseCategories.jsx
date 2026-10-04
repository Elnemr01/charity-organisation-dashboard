import { getAllCaseCategoriesFn } from '@/services/categories/case/services'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useGetAllCaseCategories = (data) => {
    
    const {data : caseCategories,isLoading,isError,error} = useQuery({
        queryKey: ['caseCategories',data.page],
        queryFn: ()=> getAllCaseCategoriesFn(data.page)
    })
    
    return {
        caseCategories,
        isLoading,
        isError,
        error
    }
        
}

export default useGetAllCaseCategories