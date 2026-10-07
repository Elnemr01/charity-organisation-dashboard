import { equlProductItemsFn } from '@/services/banks/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useEquelProductItem = () => {
    
    const {mutate: equelProductItem,isPending,isError,error} = useMutation({
        mutationKey:['equelProductItem'],
        mutationFn: (data)=> equlProductItemsFn(data),
        onError : ()=> {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تم تسويه المنتج بنجاح')
        }
    })

    return {
        equelProductItem,
        isPending,
    }

}

export default useEquelProductItem
