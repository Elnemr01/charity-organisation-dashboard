import { addNewDonationPursposeFn } from '@/services/categories/donationPurpose/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useAddNewDonationPurpose = () => {
    

    const {mutate: addNewDonationPurpose,isPending,isError,error} = useMutation({
        mutationKey:['addNewDonationPurpose'],
        mutationFn: (data)=> addNewDonationPursposeFn(data),
        onError : ()=> {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تمت إضافة التصنيف بنجاح')
        }
    })


    return {
        addNewDonationPurpose,
        isPending,
        isError,
        error
    }

}

export default useAddNewDonationPurpose