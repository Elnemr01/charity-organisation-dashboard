import { getAllAidCategoriesFn } from '@/services/categories/aid/services'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useGetAllAidCategories = (data) => {
    
    const {data : aidCategories,isLoading,isError,error} = useQuery({
        queryKey: ['aidCategories',data.page,data.debounceValue],
        queryFn: ()=> getAllAidCategoriesFn(data)
    })
    
    return {
        aidCategories,
        isLoading,
        isError,
        error
    }
        
}

export default useGetAllAidCategories