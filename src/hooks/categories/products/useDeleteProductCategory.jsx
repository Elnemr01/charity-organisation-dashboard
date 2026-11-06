import { deleteProductCategoryFn } from '@/services/categories/products/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useDeleteProductCategory = () => {
    
    const {mutate: deleteProductCategory,isPending,isError,error} = useMutation({
        mutationKey:['deleteProductCategory'],
        mutationFn: (id)=> deleteProductCategoryFn(id),
        onError : (error)=> {
            toast.error(error?.response?.data?.detail || error?.response?.data?.errors[0]?.description || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تم حذف التصنيف بنجاح')
        }
    })

    return {
        deleteProductCategory,
        isPending,
        isError,
        error
    }

}

export default useDeleteProductCategory