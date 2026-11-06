import { deleteDonationPursposeFn } from '@/services/categories/donationPurpose/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useDeleteDonationPurpose = () => {
    
    const {mutate: deleteDonationPurpose,isPending,isError,error} = useMutation({
        mutationKey:['deleteDonationPurpose'],
        mutationFn: (id)=> deleteDonationPursposeFn(id),
        onError : (error)=> {
            toast.error(error?.response?.data?.detail || error?.response?.data?.errors[0]?.description || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تم حذف التصنيف بنجاح')
        }
    })

    return {
        deleteDonationPurpose,
        isPending,
        isError,
        error
    }

}

export default useDeleteDonationPurpose