import { getAllProductCategoriesFn } from '@/services/categories/products/services'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useGetAllProductCategories = (data) => {
    
    const {data : productCategories,isLoading,isError,error} = useQuery({
        queryKey: ['productCategories',data.page,data.debounceValue],
        queryFn: ()=> getAllProductCategoriesFn(data)
    })
    
    return {
        productCategories,
        isLoading,
        isError,
        error
    }
        
}

export default useGetAllProductCategories