import { getDonerByIdFn } from '@/services/doners/services'
import { useQuery } from '@tanstack/react-query'

const useGetDonerById = (data) => {

    const { data: doner, isLoading, isError } = useQuery({
        queryKey: ['donerById', data],
        queryFn: () => getDonerByIdFn(data),
    })

    return {
        doner,
        isLoading,
        isError
    }
}

export default useGetDonerById