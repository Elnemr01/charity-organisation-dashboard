import { getAllCharityExpensesFn } from '@/services/charityExpense/services'
import { useQuery } from '@tanstack/react-query'

const useGetAllCharityExpenses = (data) => {

    const { data: charityExpenses, isLoading, isError } = useQuery({
        queryKey: ['charityExpenses', data.pageNumber, data.SearchValue],
        queryFn: () => getAllCharityExpensesFn(data)

    })

    return {
        charityExpenses,
        isLoading,
        isError
    }
}

export default useGetAllCharityExpenses