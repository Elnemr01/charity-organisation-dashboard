import { getAllCashInvertoriesFn, getAllProductItemsFn } from '@/services/banks/services'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useGetCashInventories = () => {

    const {data: cashInvertories, isLoading, isError} = useQuery({
        queryKey: ['cashInvertories'],
        queryFn: ()=> getAllCashInvertoriesFn()

    })
        

    return {
        cashInvertories,
        isLoading,
        isError
    }
}

export default useGetCashInventories