import { deleteProductUnitFn } from '@/services/categories/productUnit/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useDeleteProductUnit = () => {
    
    const {mutate: deleteProductUnit,isPending,isError,error} = useMutation({
        mutationKey:['deleteProductUnit'],
        mutationFn: (id)=> deleteProductUnitFn(id),
        onError : ()=> {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
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