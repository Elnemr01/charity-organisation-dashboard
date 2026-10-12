import { editFamilyExpenseFn } from '@/services/familyExpense/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useEditFamilyExpense = () => {

    const { mutate: editFamilyExpense, isPending } = useMutation({
        mutationKey: ['editFamilyExpense'],
        mutationFn: (data) => editFamilyExpenseFn(data),
        onError: (error) => {
            toast.error(error?.response?.data?.detail|| 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم تعديل مبلغ جدول الانفاق بنجاح')
        }
    })

    return {
        editFamilyExpense,
        isPending,
    }

}

export default useEditFamilyExpense