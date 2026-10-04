import { updateAidCategoryFn } from '@/services/categories/aid/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useUpdateCaseCategory = () => {
    
    const {mutate: updateCaseCategory,isPending,isError,error} = useMutation({
        mutationKey:['updateCaseCategory'],
        mutationFn: (data)=> updateAidCategoryFn(data),
        onError : ()=> {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
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