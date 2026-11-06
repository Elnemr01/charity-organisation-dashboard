import { transferCashInventoryFn } from '@/services/banks/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useTransferCashInventory = () => {
    
    const {mutate: transferCashInventory, isPending} = useMutation({
        mutationKey: ['transferCashInventory'],
        mutationFn: (data) => transferCashInventoryFn(data),
        onError: (error) => {
            toast.error(error?.response?.data?.detail || error?.response?.data?.errors[0]?.description || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم تحويل المبلغ بنجاح')
        }
    })

    return {
        transferCashInventory,
        isPending,
    }

}

export default useTransferCashInventory