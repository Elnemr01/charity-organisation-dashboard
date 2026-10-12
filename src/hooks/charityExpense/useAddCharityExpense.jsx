import { addCharityExpenseFn } from '@/services/charityExpense/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useAddCharityExpense = () => {

    const { mutate: addCharityExpense, isPending } = useMutation({
        mutationKey: ['addCharityExpense'],
        mutationFn: (data) => addCharityExpenseFn(data),
        onError: (error) => {
            toast.error( error?.response?.data?.detail||'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم إضافة المصروف بنجاح')
        }
    })

    return {
        addCharityExpense,
        isPending,
    }

}

export default useAddCharityExpense