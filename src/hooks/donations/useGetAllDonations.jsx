import { getAllDonationsFn } from '@/services/donations/services'
import { useQuery } from '@tanstack/react-query'

const useGetAllDonations = (data) => {

    const { data: donations, isLoading, isError } = useQuery({
        queryKey: ['donations',data],
        queryFn: () => getAllDonationsFn(data)

    })

    return {
        donations,
        isLoading,
        isError
    }
}

export default useGetAllDonations