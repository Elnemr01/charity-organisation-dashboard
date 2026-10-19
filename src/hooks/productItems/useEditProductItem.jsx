import { editProductItemFn } from '@/services/productItems/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useEditProductItem = () => {
    
    const {mutate: editProductItem, isPending} = useMutation({
        mutationKey: ['editProductItem'],
        mutationFn: (data) => editProductItemFn(data),
        onError: () => {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم تعديل المنتج بنجاح')
        }
    })

    return {
        editProductItem,
        isPending,
    }
}

export default useEditProductItem