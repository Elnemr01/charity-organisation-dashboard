import { addProductItemsFn } from '@/services/banks/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useAddProductItem = () => {
    

    const {mutate: addProductItem,isPending,isError,error} = useMutation({
        mutationKey:['addProductItem'],
        mutationFn: (data)=> addProductItemsFn(data),
        onError : ()=> {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تمت إضافة المنتج بنجاح')
        }
    })


    return {
        addProductItem,
        isPending,
    }

}

export default useAddProductItem