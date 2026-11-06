import { deleteCharityExpenseFn } from '@/services/charityExpense/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useDeleteCharityExpense = () => {

    const { mutate: deleteCharityExpense, isPending } = useMutation({
        mutationKey: ['deleteCharityExpense'],
        mutationFn: (id) => deleteCharityExpenseFn(id),
        onError: (error) => {
            toast.error(error?.response?.data?.detail || error?.response?.data?.errors[0]?.description || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم حذف المصروف بنجاح')
        }
    })

    return {
        deleteCharityExpense,
        isPending,
    }

}

export default useDeleteCharityExpense