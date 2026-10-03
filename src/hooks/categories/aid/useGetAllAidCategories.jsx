import { getAllAidCategoriesFn } from '@/services/categories/aid/services'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useGetAllAidCategories = () => {
    
    const {data : aidCategories,isLoading,isError,error} = useQuery({
        queryKey: ['aidCategories'],
        queryFn: getAllAidCategoriesFn
    })
    
    return {
        aidCategories,
        isLoading,
        isError,
        error
    }
        
}

export default useGetAllAidCategories