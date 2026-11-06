import { addProductItemFn } from '@/services/productItems/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useAddProductItem = () => {
    
    const {mutate: addNewProductItem, isPending} = useMutation({
        mutationKey: ['addNewProductItem'],
        mutationFn: (data) => addProductItemFn(data),
        onError: (error) => {
            toast.error(error?.response?.data?.detail || error?.response?.data?.errors[0]?.description || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تمت إضافة المنتج بنجاح')
        }
    })


    return {
        addNewProductItem,
        isPending,
    }
}

export default useAddProductItem