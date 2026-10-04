import { deleteCaseCategoryFn } from '@/services/categories/case/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useDeleteCaseCategory = () => {
    
    const {mutate: deleteCaseCategory,isPending,isError,error} = useMutation({
        mutationKey:['deleteCaseCategory'],
        mutationFn: (id)=> deleteCaseCategoryFn(id),
        onError : ()=> {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تم حذف التصنيف بنجاح')
        }
    })

    return {
        deleteCaseCategory,
        isPending,
        isError,
        error
    }

}

export default useDeleteCaseCategory