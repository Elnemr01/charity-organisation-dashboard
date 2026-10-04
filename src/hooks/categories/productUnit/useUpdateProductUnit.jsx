import { updateProductUnitFn } from '@/services/categories/productUnit/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useUpdateProductUnit = () => {
    
    const {mutate: updateProductUnit,isPending,isError,error} = useMutation({
        mutationKey:['updateProductUnit'],
        mutationFn: (data)=> updateProductUnitFn(data),
        onError : ()=> {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تم تعديل التصنيف بنجاح')
        }
    })

    return {
        updateProductUnit,
        isPending,
        isError,
        error
    }

}

export default useUpdateProductUnit