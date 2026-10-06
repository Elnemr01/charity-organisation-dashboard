import { getAllProductItemsFn } from '@/services/banks/services'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useGetAllProductItems = (data) => {

    const {data: productItems, isLoading, isError} = useQuery({
        queryKey: ['productItems',data.pageNumber,data.categoryId,data.SearchValue],
        queryFn: ()=> getAllProductItemsFn(data)

    })
        

    return {
        productItems,
        isLoading,
        isError
    }
}

export default useGetAllProductItems