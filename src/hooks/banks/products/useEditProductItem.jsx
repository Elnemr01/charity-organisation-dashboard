import { editProductItemsFn } from '@/services/banks/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useEditProductItem = () => {
    
    const {mutate: editProductItem,isPending,isError,error} = useMutation({
        mutationKey:['editProductItem'],
        mutationFn: (data)=> editProductItemsFn(data),
        onError : (error)=> {
            toast.error(error?.response?.data?.detail ||'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تم تعديل المنتج بنجاح')
        }
    })

    return {
        editProductItem,
        isPending,
    }

}

export default useEditProductItem
