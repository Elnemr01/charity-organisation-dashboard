import { editFinancialBudgetFn } from '@/services/financialBudget/services'
import { editProductItemFn } from '@/services/productItems/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useEditFinancialBudget = () => {
    
    const {mutate: editFinancialBudget, isPending} = useMutation({
        mutationKey: ['editFinancialBudget'],
        mutationFn: (data) => editFinancialBudgetFn(data),
        onError: (error) => {
            toast.error(error?.response?.data?.detail ||'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم تعديل جدول الدخل والانفاق بنجاح')
        }
    })

    return {
        editFinancialBudget,
        isPending,
    }
}

export default useEditFinancialBudget