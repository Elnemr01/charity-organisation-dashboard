import { deleteCaseCategoryFn } from '@/services/categories/case/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useDeleteCaseCategory = () => {
    
    const {mutate: deleteCaseCategory,isPending,isError,error} = useMutation({
        mutationKey:['deleteCaseCategory'],
        mutationFn: (id)=> deleteCaseCategoryFn(id),
        onError : (error)=> {
            toast.error(error?.response?.data?.detail || error?.response?.data?.errors[0]?.description || 'حدث خطأ برجاء المحاولة لاحقا')
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