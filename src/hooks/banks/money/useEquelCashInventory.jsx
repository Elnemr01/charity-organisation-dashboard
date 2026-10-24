import { equelCashInventoryFn } from '@/services/banks/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useEquelCashInventory = () => {
    
    const {mutate: equelCashInventory, isPending} = useMutation({
        mutationKey: ['equelCashInventory'],
        mutationFn: (data) => equelCashInventoryFn(data),
        onError: (error) => {
            toast.error(error?.response?.data?.detail ||'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم تسويه المبلغ بنجاح')
        }
    })

    return {
        equelCashInventory,
        isPending,
    }

}

export default useEquelCashInventory