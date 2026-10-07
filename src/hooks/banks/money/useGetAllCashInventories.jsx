import { getAllCashInventoriesFn } from '@/services/banks/services'
import { useQuery } from '@tanstack/react-query'

const useGetAllCashInventories = (data) => {

    const {data: cashInventories, isLoading, isError} = useQuery({
        queryKey: ['cashInventories', data.pageNumber, data.SearchValue],
        queryFn: ()=> getAllCashInventoriesFn(data)

    })
        

    return {
        cashInventories,
        isLoading,
        isError
    }
}

export default useGetAllCashInventories