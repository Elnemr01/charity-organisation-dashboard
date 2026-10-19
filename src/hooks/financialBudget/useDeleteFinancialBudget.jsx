import { deleteFinancialBudgetFn } from '@/services/financialBudget/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useDeleteFinancialBudget = () => {
    
    const {mutate: deleteFinancialBudget, isPending} = useMutation({
        mutationKey: ['deleteFinancialBudget'],
        mutationFn: (id) => deleteFinancialBudgetFn(id),
        onError: (error) => {
            toast.error(error?.response?.data?.detail || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم حذف جدول الدخل والانفاق بنجاح')
        }
    })

    return {
        deleteFinancialBudget,
        isPending,
    }
}

export default useDeleteFinancialBudget