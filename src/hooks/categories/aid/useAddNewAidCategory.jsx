import { addNewAidCategoryFn } from '@/services/categories/aid/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useAddNewAidCategory = () => {
    

    const {mutate: addNewAidCategory,isPending,isError,error} = useMutation({
        mutationKey:['addNewAidCategory'],
        mutationFn: (id)=> addNewAidCategoryFn(id),
        onError : ()=> {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تمت إضافة التصنيف بنجاح')
        }
    })


    return {
        addNewAidCategory,
        isPending,
        isError,
        error
    }

}

export default useAddNewAidCategory