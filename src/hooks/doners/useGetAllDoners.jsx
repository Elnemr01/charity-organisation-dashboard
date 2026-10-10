import { getAllDonersFn } from '@/services/doners/services'
import { useQuery } from '@tanstack/react-query'

const useGetAllDoners = (data) => {

    const { data: doners, isLoading, isError } = useQuery({
        queryKey: ['doners', data],
        queryFn: () => getAllDonersFn(data)
    })

    return {
        doners,
        isLoading,
        isError
    }
}

export default useGetAllDoners