import { getDonationByIdFn } from '@/services/donations/services'
import { useQuery } from '@tanstack/react-query'

const useGetDonationById = (id) => {

    const { data: donation, isLoading, isError } = useQuery({
        queryKey: ['donationById', id],
        queryFn: () => getDonationByIdFn(id),
    })

    return {
        donation,
        isLoading,
        isError
    }
}

export default useGetDonationById