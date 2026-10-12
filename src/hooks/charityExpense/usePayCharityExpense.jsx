import { payCharityExpenseFn } from '@/services/charityExpense/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const usePayCharityExpense = () => {

    const { mutate: payCharityExpense, isPending } = useMutation({
        mutationKey: ['payCharityExpense'],
        mutationFn: (data) => payCharityExpenseFn(data),
        onError: (error) => {
            toast.error(error?.response?.data?.detail || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم سداد المصروف بنجاح')
        }
    })

    return {
        payCharityExpense,
        isPending,
    }

}

export default usePayCharityExpense