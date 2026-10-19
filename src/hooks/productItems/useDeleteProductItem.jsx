import { deleteProductItemFn } from '@/services/productItems/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useDeleteProductItem = () => {
    
    const {mutate: deleteProductItem, isPending} = useMutation({
        mutationKey: ['deleteProductItem'],
        mutationFn: (id) => deleteProductItemFn(id),
        onError: (error) => {
            toast.error(error?.response?.data?.detail || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم حذف المنتج بنجاح')
        }
    })

    return {
        deleteProductItem,
        isPending,
    }
}

export default useDeleteProductItem