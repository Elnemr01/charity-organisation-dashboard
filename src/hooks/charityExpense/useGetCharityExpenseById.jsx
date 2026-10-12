import { getCharityExpenseByIdFn } from '@/services/charityExpense/services'
import { useQuery } from '@tanstack/react-query'

const useGetCharityExpenseById = (id) => {

    const { data: charityExpense, isLoading, isError } = useQuery({
        queryKey: ['charityExpense', id],
        queryFn: () => getCharityExpenseByIdFn(id),
        enabled: !!id
    })

    return {
        charityExpense,
        isLoading,
        isError
    }
}

export default useGetCharityExpenseById