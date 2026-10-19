import { getFinancialBudgetByIdFn } from '@/services/financialBudget/services'
import { useQuery } from '@tanstack/react-query'

const useGetFinancialBudgetById = (id) => {
    
    const {data: financialBudget, isLoading, isError} = useQuery({
        queryKey: ['financialBudgetById', id],
        queryFn: () => getFinancialBudgetByIdFn(id),
        enabled: !!id
    })
        
    return {
        financialBudget,
        isLoading,
        isError
    }
}

export default useGetFinancialBudgetById