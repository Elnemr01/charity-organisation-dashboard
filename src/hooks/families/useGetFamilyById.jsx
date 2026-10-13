import { getFamilyByIdFn } from '@/services/families/services'
import { useQuery } from '@tanstack/react-query'

const useGetFamilyById = (data) => {

    const { data: family, isLoading, isError } = useQuery({
        queryKey: ['familyById', data],
        queryFn: () => getFamilyByIdFn(data),
    })

    return {
        family,
        isLoading,
        isError
    }
}

export default useGetFamilyById