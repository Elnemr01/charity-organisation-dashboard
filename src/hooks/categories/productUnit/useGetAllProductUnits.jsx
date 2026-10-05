import { getAllProductUnitsFn } from '@/services/categories/productUnit/services'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useGetAllProductUnits = (data) => {
    
    const {data : productUnits,isLoading,isError,error} = useQuery({
        queryKey: ['productUnits',data.page,data.debounceValue],
        queryFn: ()=> getAllProductUnitsFn(data)
    })
    
    return {
        productUnits,
        isLoading,
        isError,
        error
    }
        
}

export default useGetAllProductUnits