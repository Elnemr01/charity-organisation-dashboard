import { updateAidCategoryFn } from '@/services/categories/aid/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useUpdateAidCategory = () => {
    
    const {mutate: updateAidCategory,isPending,isError,error} = useMutation({
        mutationKey:['updateAidCategory'],
        mutationFn: (data)=> updateAidCategoryFn(data),
        onError : ()=> {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تم تعديل التصنيف بنجاح')
        }
    })

    return {
        updateAidCategory,
        isPending,
        isError,
        error
    }

}

export default useUpdateAidCategory