import { getAllProductItemsFn } from '@/services/banks/services'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useGetAllProductItems = () => {

    const {data: productItems, isLoading, isError} = useQuery({
        queryKey: ['productItems'],
        queryFn: ()=> getAllProductItemsFn()

    })
        

    return {
        productItems,
        isLoading,
        isError
    }
}

export default useGetAllProductItems