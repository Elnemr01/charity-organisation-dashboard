import { updateCaseCategoryFn } from '@/services/categories/case/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useUpdateCaseCategory = () => {
    
    const {mutate: updateCaseCategory,isPending,isError,error} = useMutation({
        mutationKey:['updateCaseCategory'],
        mutationFn: (data)=> updateCaseCategoryFn(data),
        onError : (error)=> {
            toast.error(error?.response?.data?.detail || error?.response?.data?.errors[0]?.description || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تم تعديل التصنيف بنجاح')
        }
    })

    return {
        updateCaseCategory,
        isPending,
        isError,
        error
    }

}

export default useUpdateCaseCategory