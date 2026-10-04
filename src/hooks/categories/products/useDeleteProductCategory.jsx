import { deleteProductCategoryFn } from '@/services/categories/products/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useDeleteProductCategory = () => {
    
    const {mutate: deleteProductCategory,isPending,isError,error} = useMutation({
        mutationKey:['deleteProductCategory'],
        mutationFn: (id)=> deleteProductCategoryFn(id),
        onError : ()=> {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
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