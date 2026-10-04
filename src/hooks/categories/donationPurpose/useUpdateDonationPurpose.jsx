import { updateDonationPursposeFn } from '@/services/categories/donationPurpose/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useUpdateDonationPurpose = () => {
    
    const {mutate: updateDonationPurpose,isPending,isError,error} = useMutation({
        mutationKey:['updateDonationPurpose'],
        mutationFn: (data)=> updateDonationPursposeFn(data),
        onError : ()=> {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تم تعديل التصنيف بنجاح')
        }
    })

    return {
        updateDonationPurpose,
        isPending,
        isError,
        error
    }

}

export default useUpdateDonationPurpose