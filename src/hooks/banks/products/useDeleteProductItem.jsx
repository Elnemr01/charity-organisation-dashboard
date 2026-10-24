import { deleteProductItemsFn } from '@/services/banks/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useDeleteProductItem = () => {
    
    const {mutate: deleteProductItem,isPending,isError,error} = useMutation({
        mutationKey:['deleteProductItem'],
        mutationFn: (id)=> deleteProductItemsFn(id),
        onError : (error)=> {
            toast.error(error?.response?.data?.detail ||'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: ()=> {
            toast.success('تم حذف المنتج بنجاح')
        }
    })

    return {
        deleteProductItem,
        isPending,
    }

}

export default useDeleteProductItem