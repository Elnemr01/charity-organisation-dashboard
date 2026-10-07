import { deleteCashInventoryFn } from '@/services/banks/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useDeleteCashInventory = () => {
    
    const {mutate: deleteCashInventory, isPending} = useMutation({
        mutationKey: ['deleteCashInventory'],
        mutationFn: (id) => deleteCashInventoryFn(id),
        onError: () => {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم حذف المبلغ بنجاح')
        }
    })

    return {
        deleteCashInventory,
        isPending,
    }

}

export default useDeleteCashInventory