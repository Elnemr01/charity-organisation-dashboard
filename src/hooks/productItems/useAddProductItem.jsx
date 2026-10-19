import { addProductItemFn } from '@/services/productItems/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useAddProductItem = () => {
    
    const {mutate: addNewProductItem, isPending} = useMutation({
        mutationKey: ['addNewProductItem'],
        mutationFn: (data) => addProductItemFn(data),
        onError: () => {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
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