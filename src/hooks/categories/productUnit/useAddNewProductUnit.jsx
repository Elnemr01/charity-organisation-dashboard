import { addNewCaseCategoryFn } from '@/services/categories/case/services'
import { addNewProductUnitFn } from '@/services/categories/productUnit/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useAddNewProductUnit = () => {
    

    const {mutate: addNewProductUnit , isPending,isError,error} = useMutation({
        mutationKey:['addNewProductUnit'],
        mutationFn: (data)=> addNewProductUnitFn(data),
        onError : (error)=> {
            toast.error(error?.response?.data?.detail || error?.response?.data?.errors[0]?.description || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تمت إضافة التصنيف بنجاح')
        }
    })


    return {
        addNewProductUnit,
        isPending,
        isError,
        error
    }

}

export default useAddNewProductUnit