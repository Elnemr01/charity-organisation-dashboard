import { updateProductCategoryFn } from '@/services/categories/products/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useUpdateProductCategory = () => {
    
    const {mutate: updateProductCategory,isPending,isError,error} = useMutation({
        mutationKey:['updateProductCategory'],
        mutationFn: (data)=> updateProductCategoryFn(data),
        onError : (error)=> {
            toast.error(error?.response?.data?.detail || error?.response?.data?.errors[0]?.description || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تم تعديل التصنيف بنجاح')
        }
    })

    return {
        updateProductCategory,
        isPending,
        isError,
        error
    }

}

export default useUpdateProductCategory