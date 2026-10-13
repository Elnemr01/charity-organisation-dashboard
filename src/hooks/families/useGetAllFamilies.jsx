import { getAllFamiliesFn } from '@/services/families/services'
import { useQuery } from '@tanstack/react-query'

const useGetAllFamilies = (data) => {

    const { data: families, isLoading, isError } = useQuery({
        queryKey: ['families', data],
        queryFn: () => getAllFamiliesFn(data)
    })

    return {
        families,
        isLoading,
        isError
    }
}

export default useGetAllFamilies