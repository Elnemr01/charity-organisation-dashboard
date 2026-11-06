import { addNewCaseCategoryFn } from '@/services/categories/case/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useAddNewCaseCategory = () => {
    

    const {mutate: addNewCaseCategory,isPending,isError,error} = useMutation({
        mutationKey:['addNewCaseCategory'],
        mutationFn: (data)=> addNewCaseCategoryFn(data),
        onError : (error)=> {
            toast.error(error?.response?.data?.detail || error?.response?.data?.errors[0]?.description || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تمت إضافة التصنيف بنجاح')
        }
    })


    return {
        addNewCaseCategory,
        isPending,
        isError,
        error
    }

}

export default useAddNewCaseCategory