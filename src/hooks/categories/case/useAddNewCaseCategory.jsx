import { addNewCaseCategoryFn } from '@/services/categories/case/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useAddNewCaseCategory = () => {
    

    const {mutate: addNewCaseCategory,isPending,isError,error} = useMutation({
        mutationKey:['addNewCaseCategory'],
        mutationFn: (data)=> addNewCaseCategoryFn(data),
        onError : ()=> {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
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