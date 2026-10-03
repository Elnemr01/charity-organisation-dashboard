import { deleteAidCategoryFn } from '@/services/categories/aid/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useDeleteAidCategory = () => {
    
    const {mutate: deleteAidCategory,isPending,isError,error} = useMutation({
        mutationKey:['deleteAidCategory'],
        mutationFn: (id)=> deleteAidCategoryFn(id),
        onError : ()=> {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تم حذف التصنيف بنجاح')
        }
    })

    return {
        deleteAidCategory,
        isPending,
        isError,
        error
    }

}

export default useDeleteAidCategory