import { getAllCaseCategoriesFn } from '@/services/categories/case/services'
import { getAllDonationPursposesFn } from '@/services/categories/donationPurpose/services'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useGetAllDonationPurposes = (data) => {
    
    const {data : donationPursposes,isLoading,isError,error} = useQuery({
        queryKey: ['donationPursposes',data],
        queryFn: ()=> getAllDonationPursposesFn(data)
    })
    
    return {
        donationPursposes,
        isLoading,
        isError,
        error
    }
        
}

export default useGetAllDonationPurposes