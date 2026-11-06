import { addNewAidCategoryFn } from '@/services/categories/aid/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useAddNewAidCategory = () => {
    

    const {mutate: addNewAidCategory,isPending,isError,error} = useMutation({
        mutationKey:['addNewAidCategory'],
        mutationFn: (data)=> addNewAidCategoryFn(data),
        onError : (error)=> {
            toast.error(error?.response?.data?.detail || error?.response?.data?.errors[0]?.description || 'حدث خطأ برجاء المحاولة لاحقا')
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