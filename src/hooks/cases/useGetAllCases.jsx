import { getAllCasesFn } from '@/services/cases/services'
import { useQuery } from '@tanstack/react-query'

const useGetAllCases = (data) => {

    const { data: cases, isLoading, isError } = useQuery({
        queryKey: ['cases', data],
        queryFn: () => getAllCasesFn(data)
    })

    return {
        cases,
        isLoading,
        isError
    }
}

export default useGetAllCases