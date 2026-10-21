import { addFinancialBudgetFn } from '@/services/financialBudget/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useAddFinancialBudget = () => {
    
    const {mutate: addNewFinancialBudget, isPending} = useMutation({
        mutationKey: ['addNewFinancialBudget'],
        mutationFn: (data) => addFinancialBudgetFn(data),
        onError: (error) => {
            toast.error(error?.response?.data?.detail ||'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تمت إضافة جدول الدخل والانفاق بنجاح')
        }
    })


    return {
        addNewFinancialBudget,
        isPending,
    }
}

export default useAddFinancialBudget