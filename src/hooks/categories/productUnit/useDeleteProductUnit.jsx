import { deleteProductUnitFn } from '@/services/categories/productUnit/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useDeleteProductUnit = () => {
    
    const {mutate: deleteProductUnit,isPending,isError,error} = useMutation({
        mutationKey:['deleteProductUnit'],
        mutationFn: (id)=> deleteProductUnitFn(id),
        onError : (error)=> {
            toast.error(error?.response?.data?.detail || error?.response?.data?.errors[0]?.description || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تم حذف التصنيف بنجاح')
        }
    })

    return {
        deleteProductUnit,
        isPending,
        isError,
        error
    }

}

export default useDeleteProductUnit