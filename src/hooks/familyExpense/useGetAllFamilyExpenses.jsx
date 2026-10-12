import { getAllFamilyExpensesFn } from '@/services/familyExpense/services'
import { useQuery } from '@tanstack/react-query'

const useGetAllFamilyExpenses = (data) => {

    const { data: familyExpenses, isLoading, isError } = useQuery({
        queryKey: ['familyExpenses'],
        queryFn: () => getAllFamilyExpensesFn()

    })

    return {
        familyExpenses,
        isLoading,
        isError
    }
}

export default useGetAllFamilyExpenses