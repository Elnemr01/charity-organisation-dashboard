import { addNewProductCategoryFn } from '@/services/categories/products/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useAddNewProductCategory = () => {
    

    const {mutate: addNewProductCategory,isPending,isError,error} = useMutation({
        mutationKey:['addNewProductCategory'],
        mutationFn: (data)=> addNewProductCategoryFn(data),
        onError : ()=> {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تمت إضافة التصنيف بنجاح')
        }
    })


    return {
        addNewProductCategory,
        isPending,
        isError,
        error
    }

}

export default useAddNewProductCategory