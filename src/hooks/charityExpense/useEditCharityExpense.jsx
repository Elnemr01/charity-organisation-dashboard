import { editCharityExpenseFn } from '@/services/charityExpense/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useEditCharityExpense = () => {

    const { mutate: editCharityExpense, isPending } = useMutation({
        mutationKey: ['editCharityExpense'],
        mutationFn: (data) => editCharityExpenseFn(data),
        onError: () => {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم تعديل المصروف بنجاح')
        }
    })

    return {
        editCharityExpense,
        isPending,
    }

}

export default useEditCharityExpense