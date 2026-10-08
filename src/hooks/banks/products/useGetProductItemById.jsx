import { getProductItemByIdFn } from '@/services/banks/services'
import { useQuery } from '@tanstack/react-query'

const useGetProductItemById = (id) => {
    
    const {data: productItem, isLoading, isError} = useQuery({
        queryKey: ['productItem', id],
        queryFn: () => getProductItemByIdFn(id),
        enabled: !!id
    })
        
    return {
        productItem,
        isLoading,
        isError
    }
}

export default useGetProductItemById