import { addCaseFn } from '@/services/cases/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useAddCase = () => {

    const { mutate: addCase, isPending } = useMutation({
        mutationKey: ['addCase'],
        mutationFn: (data) => addCaseFn(data),
        onError: (error) => {
            toast.error(error?.response?.data?.detail ||'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم إضافة الحاله بنجاح')
        }
    })

    return {
        addCase,
        isPending,
    }
}

export default useAddCase