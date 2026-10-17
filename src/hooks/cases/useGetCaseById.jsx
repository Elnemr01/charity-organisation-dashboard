import { getCaseByIdFn } from '@/services/cases/services'
import { useQuery } from '@tanstack/react-query'

const useGetCaseById = (data) => {

    const { data: familyCase, isLoading, isError } = useQuery({
        queryKey: ['familyCaseById', data],
        queryFn: () => getCaseByIdFn(data),
    })

    return {
        familyCase,
        isLoading,
        isError
    }
}

export default useGetCaseById